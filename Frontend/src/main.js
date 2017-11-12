/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    $(".nav-pills li").on("click", function () {
        $(".nav-pills li").removeClass("active");
        $(this).addClass("active");
        var filt = $(this).find('a').data("filter");
        PizzaMenu.filterPizza(filt);
    })

    $(".clear-cart").click(function () {
        PizzaCart.clearCart();
    });

    $(".next-step-button").click(function () {
        if ($("#inputName").val() === "") {
            $(".name-help-block").show();
        } else $(".name-help-block").hide();
        if ($("#inputPhone").val() === "") {
            $(".phone-help-block").show();
        } else $(".phone-help-block").hide();
        if ($("#inputAddress").val() === "") {
            $(".address-help-block").show();
        } else $(".address-help-block").hide();
    });

    $("#inputName").on("input", function () {
        if (!valName()) {
            $(".name-help-block").show();
        } else {
            $(".name-help-block").hide();
        }
    });

    $("#inputPhone").on("input", function () {
        if (!valPhone()) {
            $(".phone-help-block").show();
        } else {
            $(".phone-help-block").hide();
        }
    });

    $("#inputAddress").on("input", function () {
        if (!valAddress()) {
            $(".address-help-block").show();
        } else {
            $(".address-help-block").hide();
        }
    });

    function valName() {
        var expr = $("#inputName").val();
        return expr.match(/^([a-zA-Zа-яА-Я]+|[a-zA-Zа-яА-Я]+[ ][a-zA-Zа-яА-Я]+|([a-zA-Zа-яА-Я]+[\-][a-zA-Zа-яА-Я]+))+$/);
    }

    function valPhone() {
        var expr = $("#inputPhone").val();
        return expr.match(/^(\+380\d{9}|0\d{9})$/);
    }

    function valAddress() {
        //later, when google map
        return true;
    }

    $(".next-step-button").click(function () {
        if (valName() && valPhone() && valAddress()) {
            PizzaCart.createOrder(function (err, data) {
                if (err){
                   return console.log("Can't create order");
                }
                alert("Order created");
            });
        }
    });
});