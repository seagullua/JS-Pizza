
$(document).ready(function() {
    loadPizzas('all');    //for filters
    loadPizzaList();
});

function loadPizzaList(){
    let totalPrice = 0;
    for (let i = 0; i < localStorage.length; i++){
        let el = JSON.parse((localStorage.getItem(localStorage.key(i))));
        totalPrice += parseInt(el.quantity) * parseInt(el.price);
        $('.order-items').append(`
                <div class ="full-order-object">
                    <div class = "item-name">
                        ${el.name}
                    </div>
                    <div class = "order-size-weight">
                        <img src="images/weight.svg">${el.weight}
                        <img src="images/size-icon.svg">${el.size}
                    </div>
                    <div class = "order-item" id=${el.id}>
                        <div class = "left-cell">
                            ${el.price * el.quantity} грн.
                        </div>
                        <div class="center-cell">
                            <button class="minus-pizza">-</button>
                            <div class="quantity-pizza"><p>${el.quantity}</p></div>
                            <button class="plus-pizza">+</button>
                        </div>
                        <div class="right-cell">
                            <button class = "delete-pizza">Х</button>
                        </div>
                    </div>
                </div> 
        `)
    }
    $('.order-quantity').append(localStorage.length);
    $('.order-result-sum').append(`Сума замовлення ${totalPrice} грн.`)
}

function clearList(){
    document.querySelector('.order-items').innerHTML = '';
    document.querySelector('.order-quantity').innerHTML = '';
    document.querySelector('.order-result-sum').innerHTML = '';
    loadPizzaList();
}

$(document).on('click','#buy-pizza',function(){
    const id = $(this).parent().attr('id');
    const price = $(this).parent().find('.price').text();
    const weight = $(this).parent().find('.weight').text();
    const size = $(this).parent().find('.size').text();
    const name = $(this).parent().parent().parent().find('.pizza-name').text();

    let found = false;
    let new_object = {name: name, id: id, price: price, size:size, weight:weight,  quantity:1};
    if (localStorage.length === 0){
        localStorage.setItem(id, JSON.stringify(new_object));
    }else {
        for (let i = 0; i < localStorage.length ; i++) {
            let el = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(el.quantity);
            el.quantity = parseInt(el.quantity) + 1;
            if (el.id === id) {
                localStorage.setItem(id, JSON.stringify(el));
                found = true;
                break;
            }
        }
        if(!found){
            localStorage.setItem(id, JSON.stringify(new_object));
        }
    }
    console.log(localStorage.length);
    clearList();
});

// function getPizzaById(id){
//     console.log(id);
//     for (let i = 0; i < localStorage.length; i++){
//         if(localStorage.getItem(localStorage.key(i)).id === id){
//             console.log("by id");
//             console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
//             return JSON.parse(localStorage.getItem(localStorage.key(i)))
//         }
//     }
// }

 $(document).on('click', '.minus-pizza', function(e) {
     let pizza_id = $(this).parent().parent().attr('id');
     for (let i = 0; i < localStorage.length; i++) {
         let pizza_object = JSON.parse(localStorage.getItem(localStorage.key(i)));
         if (pizza_object.id === pizza_id) {
             if(parseInt(pizza_object.quantity) > 0) {
                pizza_object.quantity = parseInt(pizza_object.quantity) - 1;
                localStorage.setItem(pizza_id, JSON.stringify(pizza_object));
             }
             break;
         }
     }
     clearList();
 });


 $(document).on('click', '.plus-pizza', function(e) {
     let pizza_id = $(this).parent().parent().attr('id');
     for (let i = 0; i < localStorage.length; i++) {
         let pizza_object = JSON.parse(localStorage.getItem(localStorage.key(i)));
         if (pizza_object.id === pizza_id) {
             pizza_object.quantity = parseInt(pizza_object.quantity) + 1;
             localStorage.setItem(pizza_id, JSON.stringify(pizza_object));
             break;
         }
     }
     clearList();
 });

 $(document).on('click', '.delete-pizza', function(e) {
     let pizza_id = $(this).parent().parent().attr('id');
    localStorage.removeItem(pizza_id);
     clearList();
 });

 $(document).on('click', '.clear-cart', function(e) {
     localStorage.clear();
     clearList();
 });

 $(document).on('click', '.filter-item', function(e) {
     document.querySelector('.pizza-list').innerHTML = '';
     document.querySelector('.all-pizza-quantity').innerHTML = '';
     loadPizzas($(this).attr('id'));
 });


function loadPizzas(filter) {
    fetch('json/pizzas.json')
        .then(results => {
            results.json()
                .then(function (array) {
                    if(filter === 'all') {
                        array.forEach(el => renderPizza(el));
                        $('.all-pizza-quantity').append(`${array.length}`)
                    }else{
                        let pizza_count = 0;
                        array.forEach(function(el){
                            if(el.ingredients.includes(filter)){
                                pizza_count += 1;
                                renderPizza(el)
                            }
                        });
                        $('.all-pizza-quantity').append(`${pizza_count}`)
                    }
                })
        });
}

function getIngredients(array_of_ings) {
    let result = "";
    array_of_ings.forEach(el => result += el + ', ');
    return result
}

function renderPizza(pizza_object){
    $('.pizza-list').append(`
                    <div class = "pizza-item col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" id = ${pizza_object.id}>
                        <div class="thumbnail pizza-card">
                            <img src=${pizza_object.img}>
                            <div class="caption">
                                <h3 class="pizza-name">${pizza_object.name}</h3>
                                <p>${pizza_object.title}</p>
                                <p>${getIngredients(pizza_object.ingredients)}</p>
                                <div class="pizza-footer-info">
                                    <div class = "small_size" id = ${pizza_object.id}>
                                        <div class="size"><img src="images/size-icon.svg">${pizza_object.small_size.size}</div>
                                        <div class="weight"><img src="images/weight.svg">${pizza_object.small_size.weight}</div>
                                        <div class = "price">${pizza_object.small_size.price}</div>
                                        <div>грн.</div>
                                        <div href="#" id="buy-pizza">Купити</div>
                                    </div>
                                    <div class = "big_size" id = ${pizza_object.id}>
                                        <div class="size"><img src="images/size-icon.svg">${pizza_object.big_size.size}</div>
                                        <div class="weight"><img src="images/weight.svg">${pizza_object.big_size.weight}</div>
                                        <div class="price">${pizza_object.big_size.price}</div>
                                        <div>грн.</div>
                                        <div href="#" id="buy-pizza">Купити</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
}





