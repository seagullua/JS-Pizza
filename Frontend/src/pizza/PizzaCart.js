/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $top = $('.top-part');

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var price = pizza[size].price;
    var oneprice = pizza[size].price;
    var id = pizza.id;
    var repeat = false;
    if (Cart.length !== 0) {
        for (var i = 0; i < Cart.length; i++) {
            if (Cart[i].id === id && Cart[i].size === size) {
                repeat = true;
                var cart_item = Cart[i];
                var x = Cart.indexOf(Cart[i]);
                if (x === Cart.length-1) {
                    Cart[i].quantity += 1;
                    Cart[i].price += Cart[i].one;
                } else {
                    Cart.splice(x, 1);
                    Cart.push(cart_item);
                }
            }
        }
    }
    //Приклад реалізації, можна робити будь-яким іншим способом
    if (!repeat) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
            price: price,
            one: oneprice,
            id: id
        });
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var id = cart_item.id;
    var size = cart_item.size;
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].id === id && Cart[i].size === size) {
            var x = Cart.indexOf(Cart[i]);
            Cart.splice(x, 1);
        }
    }
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            cart_item.price += cart_item.one;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            if (cart_item.quantity == 1) {
                $node.remove();
                removeFromCart(cart_item);
                updateCart();
            } else {
                cart_item.quantity -= 1;
                cart_item.price -= cart_item.one;
                console.log(cart_item.quantity);
                updateCart();
            }
        });

        $node.find(".remove").click(function () {
            $node.remove();
            removeFromCart(cart_item);
            updateCart();
        });

        $cart.prepend($node);
    }

    emptyCart();
    updateOrders();
    Cart.forEach(showOnePizzaInCart);
}

function updateOrders() {
    $top.html("");
    var html_code = Templates.Orders();
    var $node = $(html_code);
    $top.html($node);
    $top.find('.oval').text(Cart.length);
    $top.find('#top-p').click(function () {
        Cart = [];
        updateCart();
    });
}

function emptyCart() {
    var html_code = Templates.EmptyCart();
    var $node = $(html_code);
    if (Cart.length === 0) {
        $cart.prepend($node);
    } else {
        $cart.find($node).remove();
    }
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.updateOrders = updateOrders;

exports.PizzaSize = PizzaSize;