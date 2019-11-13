/**
 * Created by chaika on 09.02.16.
 */
var LIQPAY_PUBLIC_KEY = "i52562539941";
var LIQPAY_PRIVATE_KEY = "jXtyOihGPd4wfVi1mROoNm5btRJ9br57RluxNTCn";

var crypto = require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str) {
    return new Buffer(str).toString('base64');
}

var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function (req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function (req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var descrip = "";

    order_info.Pizzas.forEach(function (t) {
        descrip += "<" + t.pizza.title + "> ";
    })

    var order = {
        version: 3,
        public_key: LIQPAY_PUBLIC_KEY,
        action: "pay",
        amount: order_info.Sum,
        currency: "UAH",
        description: "Pizzas ordered: " + descrip + "\nName: " +
                        order_info.Name + "\nPhone: " + order_info.Phone + "\nAddress: " + order_info.Address,
        order_id: Math.random(),
        //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);

    res.send({
        success: true,
        Name: order_info.Name,
        Phone: order_info.Phone,
        Address: order_info.Address,
        Pizzas: order_info.Pizzas.length,
        Sum: order_info.Sum,
        data: data,
        signature: signature
    });
};