/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List;
var API = require('../API');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $title = $(".title");
var $allmenu = $(".all-menu");
var name = 'Усі піци ';
var filter = 'all';

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".big-button").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            PizzaCart.updateOrders();
        });
        $node.find(".small-button").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            PizzaCart.updateOrders();
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
    updateCountsPizza(list);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var a;

    Pizza_List.forEach(function(pizza){
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);
        //TODO: зробити фільтри
        if (filter !== 'vega') {
            a = pizza['content'][filter];
            if (a !== undefined) {
                pizza_shown.push(pizza);
            }
        } else {
            if (pizza.type === 'Вега піца') {
                pizza_shown.push(pizza);
            }
        }
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    API.getPizzaList(function (err, data) {
        if (!err) {
            Pizza_List = data;
            showPizzaList(Pizza_List);
        } else {
            console.log(err.status);
        }
    });
}

function updateCountsPizza(list) {
    $title.html("");
    $allmenu.html("");
    var html_code = Templates.PizzaName({pizza: {title_name: name}});
    var $node = $(html_code);
    var html_code2 = Templates.PizzaCount({pizza: list});
    var html_code3 = Templates.PizzaMenu({pizza: {is_active: filter}});
    var $node2 = $(html_code2);
    var $node3 = $(html_code3);
    $title.append($node);
    $('.menu-name').append($node2);
    $allmenu.append($node3);
    $node3.find('.all').click(function () {
        name = 'Усі піци ';
        filter = 'all';
        showPizzaList(Pizza_List);
    });
    $node3.find('.meat').click(function () {
        name = 'М\'ясні піци ';
        filter = 'meat';
        filterPizza(filter);
    });
    $node3.find('.pineapple').click(function () {
        name = 'Піци з ананасами ';
        filter = 'pineapple';
        filterPizza(filter);
    });
    $node3.find('.mushroom').click(function () {
        name = 'Піци з грибами ';
        filter = 'mushroom';
        filterPizza(filter);
    });
    $node3.find('.ocean').click(function () {
        name = 'Піци з морепродуктами ';
        filter = 'ocean';
        filterPizza(filter);
    });
    $node3.find('.vega').click(function () {
        name = 'Вегетеріанські піци ';
        filter = 'vega';
        filterPizza(filter);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;