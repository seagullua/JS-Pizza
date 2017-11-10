/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('./Storage');

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
    //TODO: ...

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

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    Storage.write("cart", Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");

    var total = 0;
    var one_pizza_sum = 0;
    var number_of_pizzas = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        //total += cart_item.pizza[cart_item.size].price;// !!!!!!!!!!!!!!!!!!!

        number_of_pizzas +=1;
        $(".order-count").text(number_of_pizzas);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
           // total += cart_item.pizza[cart_item.size].price;
           // $(".order-count").text(total);

            one_pizza_sum = cart_item.pizza[cart_item.size].quantity * cart_item.pizza[cart_item.size].price;
            $(".price").text(one_pizza_sum);

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            //Збільшуємо кількість замовлених піц
            if (cart_item.quantity === 1) {
                removeFromCart(cart_item);
                updateCart();
            } else {
                cart_item.quantity -= 1;
                //total -= cart_item.pizza[cart_item.size].price;
                //$(".order-count").text(total);

                one_pizza_sum -= cart_item.pizza[cart_item.size].price;
                $(".price").text(one_pizza_sum);
                updateCart();
            }
        });

        $node.find(".count-clear").click(function () {
            removeFromCart(cart_item);
            //total -= cart_item.pizza[cart_item.size].price;
            //$(".order-count").text(total);
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.clearCart = clearCart();
exports.PizzaSize = PizzaSize;