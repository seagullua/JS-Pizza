/**
 * Created by chaika on 25.01.16.
 */

$(function () {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var googleMaps = require("./googleMaps");


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

        googleMaps.geocodeAddress($("#inputAddress").val(), function (err, coordinates) {
            if (!err) {
                googleMaps.geocodeLatLng(coordinates, function (err, address) {
                    if (!err) {
                        $(".order-adress").text($("#inputAddress").val());
                        googleMaps.updateMarker(coordinates);
                        googleMaps.calculateRoute(new google.maps.LatLng(50.464379, 30.519131), coordinates, function (err, data) {
                            if (!err) {
                                $(".order-time").text(data.duration.text);
                            } else {
                                $(".order-time").text("Помилка");
                            }
                        })
                    } else {
                        $(".order-adress").text("Немає адреси");
                    }
                });
            }
        });


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
        if ($("#inputAddress").val() === "") {
            $(".address-help-block").show();
            return false
        } else $(".address-help-block").hide();
        return true;
    }

    $(".next-step-button").click(function () {
        if (valName() && valPhone() && valAddress()) {
            PizzaCart.createOrder(function (err, data) {
                if (err) {
                    return console.log("Can't create order");
                }
                // alert("Order created");

                LiqPayCheckout.init({
                    data: data.data,
                    signature: data.signature,
                    embedTo: "#liqpay",
                    mode: "embed"	//	popup	||	popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                    alert("Order status: " + data.status);
                }).on("liqpay.ready", function (data) {
                    //	ready
                }).on("liqpay.close", function (data) {
                    //	close
                });
            });
        }
    });

});