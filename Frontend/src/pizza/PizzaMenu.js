/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".bb").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".bs").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

var PizzaFilter = {
    All: 0,
    Meat: 1,
    Pineaple: 2,
    Mushroom: 3,
    Sea: 4,
    Veg: 5
}


function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    if (filter === PizzaFilter.All) {
        showPizzaList(Pizza_List);
        $(".all-pizza-title").text("Усі піци");
        $(".pizza-count").text("8");
    } else {
        if (filter === PizzaFilter.Meat) {
            Pizza_List.forEach(function (pizza) {
                if (pizza.type === 'М’ясна піца') {
                    pizza_shown.push(pizza);
                }
            });
            $(".all-pizza-title").text("М'ясні піци");
        } else if (filter === PizzaFilter.Pineaple) {
            Pizza_List.forEach(function (pizza) {
                if (pizza.content.pineapple) {
                    pizza_shown.push(pizza);
                }
            });
            $(".all-pizza-title").text("Піци з ананасами");
        }else if (filter === PizzaFilter.Mushroom) {
            Pizza_List.forEach(function (pizza) {
                if (pizza.content.mushroom) {
                    pizza_shown.push(pizza);
                }
            });
            $(".all-pizza-title").text("Піци з грибами");
        }else if (filter === PizzaFilter.Sea) {
            Pizza_List.forEach(function (pizza) {
                if (pizza.content.ocean) {
                    pizza_shown.push(pizza);
                }
            });
            $(".all-pizza-title").text("Піци з морепродуктами");
        }else if (filter === PizzaFilter.Veg) {
            Pizza_List.forEach(function (pizza) {
                if (pizza.type === 'Вега піца') {
                    pizza_shown.push(pizza);
                }
            });
            $(".all-pizza-title").text("Вегетарінські піци");
        }
        $(".pizza-count").text(pizza_shown.length);
        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
    }
}


function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
