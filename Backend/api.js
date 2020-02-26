/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var LIQPAY_PUBLIC_KEY = 'i44678216860';
var LIQPAY_PRIVATE_KEY = 'PQwLmIFcKU0XiVqVTgzFBLRTDAfNjtUkg0wwAAWQ';
var data;
var signature;
var crypto = require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str) {
    return new Buffer(str).toString('base64');
}

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var pizzas = '';
    for (var i = 0; i < order_info.pizza.length; i++) {
        pizzas += '\n - ' + order_info.pizza[i].quantity + 'шт. [' + order_info.pizza[i].size + '] ' + order_info.pizza[i].name_pizza + ' ' + order_info.pizza[i].price + ' грн;';
    }
    var order	=	{
        version: 3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	order_info.price,
        currency: "UAH",
        description: "Замовлення піци: " + order_info.name + "\n Адреса доставки: " + order_info.address + "\n Телефон: " + order_info.phone + "\n Замовлення: " + pizzas + "\n Сума: " + order_info.price + " грн.",
        order_id: Math.random(),
        sandbox: 1
    };
    data = base64(JSON.stringify(order));
    signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);
    res.send({
        success: true,
        name: order_info.name,
        address: order_info.address,
        phone: order_info.phone,
        data: data,
        signature: signature
    });
};