/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('./Storage');
var API = require('../API');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    function checkIfPresent() {
        for (var i = 0; i < Cart.length; i++) {
            if (Cart[i].pizza.id == pizza.id && size == Cart[i].size) return i;
        }
        return -1;
    }

    var check = checkIfPresent();
    if (check === -1) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    } else {
        Cart[check].quantity++;
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}


function removeFromCart(cart_item) {
    Cart.splice(Cart.indexOf(cart_item), 1);
    updateCart();
}

function clearCart() {
    $(".clear-order").click(function () {
        Cart = [];
        $(".order-count").text(0);
        updateCart();
    });
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його

    var saved_cart = Storage.read("cart");
    if (saved_cart) {
        Cart = saved_cart;
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function countTotal() {
    var total = 0;
    Cart.forEach(function (pizzacart) {
        total += pizzacart.pizza[pizzacart.size].price * pizzacart.quantity;
    });
    return total;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    var number_of_pizzas = Cart.length;
    $(".order-count").text(number_of_pizzas);
    $(".sum-number").text(countTotal() + " грн.");

    Storage.write("cart", Cart);
    $cart.html("");  //Очищаємо старі піци в кошику

    var one_pizza_sum = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code;
        if($(".clear-order").html() === undefined){
            html_code = Templates.PizzaCart_OneItemSubmission(cart_item);
        }else {
            html_code = Templates.PizzaCart_OneItem(cart_item);
        }
        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            one_pizza_sum = cart_item.pizza[cart_item.size].quantity * cart_item.pizza[cart_item.size].price;
            $(".price").text(one_pizza_sum);

            updateCart();
        });

        $node.find(".minus").click(function () {
            //Збільшуємо кількість замовлених піц
            if (cart_item.quantity === 1) {
                removeFromCart(cart_item);
                updateCart();
            } else {
                cart_item.quantity -= 1;

                one_pizza_sum -= cart_item.pizza[cart_item.size].price;
                $(".price").text(one_pizza_sum);
                updateCart();
            }
        });

        $node.find(".count-clear").click(function () {
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    if (number_of_pizzas === 0) {
        $cart.html(" <div class=\"no-order-text\" id = \"empty-fridge\">\n" +
            "            Пусто в холодильнику?\n" +
            "            <br>\n" +
            "            Замовте піцу!\n" +
            "            </div>");
        $(".sum-title").hide();
        $(".sum-number").hide();
        $(".button-order").prop("disabled", true);
    } else {
        $(".sum-title").show();
        $(".sum-number").show();
        $(".button-order").prop("disabled", false);
    }
}

function createOrder(callback) {
    API.createOrder({
        Name: $("#inputName").val(),
        Phone: $("#inputPhone").val(),
        Address: $("#inputAddress").val(),
        Pizzas: Cart,
        Sum: countTotal()
    }, function (err, result) {
        if(err) return callback(err);
        callback(null,  result);
    })
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.clearCart = clearCart();
exports.PizzaSize = PizzaSize;

exports.createOrder = createOrder;