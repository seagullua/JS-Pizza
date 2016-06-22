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
//var Cart = [];

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var cart_map = [];
var count = 0;
//var totalPrice=0;

//HTML едемент куди будуть додаватися піци
var $cart = $("#cartList");

//HTML едемент куди будуть додаватися піци
//var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var cart_id = cart_map[pizza.id];

    if (cart_id && (cart_id[size] || cart_id[size] === 0)){
            Cart[cart_id[size]].quantity += 1;
            
    } else {
        if (!cart_map[pizza.id]){
            cart_map[pizza.id] = [];
        }
        cart_map[pizza.id][size] = 
        Cart.push({
            pizza: pizza,
            size: size,
   //         price: pizza.size.price,
            quantity: 1
        }) - 1;
    }

    //Оновити вміст кошика на сторінці
    updateCart();
    
    //Приклад реалізації, можна робити будь-яким іншим способом
/*    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
    */
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    if (cart_item.cart_id){
        Cart.splice(cart_item.cart_id, 1);
            
    }

    //Після видалення оновити відображення
    updateCart();
    
    //Після видалення оновити відображення
 //   updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var cart = localStorage.getItem("cart");
    if (cart) 
        Cart = JSON.parse(cart);

    $("#clear").click(clearCart);

    updateCart();
  //  updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function clearCart(){
    Cart = [];
    cart_map = [];

    
    updateCart();
    count = 0;
    //totalPrice=0;

    $("#count").html(count);
 //   $("#sumNum").html(totalPrice);
}

function updateCart() {
    

    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item, id, arr) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        cart_item.cart_id = id;

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            count +=1;
   //         totalPrice+=cart_item.price;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            
            if (cart_item.quantity > 1){
                cart_item.quantity -= 1;
       //         totalPrice-=cart_item.price;
                count -=1;
            }
            
            //Оновлюємо відображення
            updateCart();
        });


        $node.find(".count-clear").click(function(){
             
            count -= cart_item.quantity;
       //     totalPrice-=(cart_item.price*cart_item.quantity);
            $("#count").html(count);
     //       $("#sumNum").html(totalPrice);
             arr.splice(id, 1);

            updateCart();
        });
        count = 0;
  //      totalPrice=0;
        if(Cart.length != 0){
            Cart.forEach(function(pizza){
                count += pizza.quantity;
     //           totalPrice+=(pizza.quantity*pizza.price);
            });
        }
//        else{ count = 0;totalPrice=0;}
        else count=0;
        $("#count").html(count);
   //     $("#sumNum").html(totalPrice);

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    
    localStorage.setItem("cart", JSON.stringify(Cart));
    
    
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    //Очищаємо старі піци в кошику
/*    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
*/
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;