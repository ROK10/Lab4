
var Templates = require('../Templates');
var LocalStorage = require('./LocalStorage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

//Очистити кошик покупок
function clean() {
    Cart = [];
    updateCart();
}
    function addToCart(pizza, size) {
    var bool = true;
    Cart.forEach(function (pizza_cart) {
        if(pizza === pizza_cart.pizza && size === pizza_cart.size){
            pizza_cart.quantity++;
            bool = false;
        }
    });
    if(bool) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }    
    //Оновити вміст кошика на сторінці
    updateCart();
}
function sum(){
    var res = 0;
    Cart.forEach(function (pizza_cart) {
         res += pizza_cart.pizza[pizza_cart.size].price*pizza_cart.quantity;
    });
    return res;
}
function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var temp = [];
    var n = 0;
    for(var i=0; i<Cart.length; i++){
        if(Cart.indexOf(cart_item) !== i) {
            temp[n] = Cart[i];
            n++;
        }
    }
    Cart = [];
    Cart = temp;
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    var saved = LocalStorage.get('cart');
    if(saved) {
        Cart = saved;
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    $(".order-label .count").text(Cart.length);
    $('#count-sum').text(sum() + " грн.");
    LocalStorage.set("cart", Cart);
    $cart.html("");

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
$node.find(".minus").click(function () {
            if (cart_item.quantity === 1) {
                removeFromCart(cart_item);
            } else {
                //Зменшуємо кількість замовлених піц
                cart_item.quantity -= 1;
            }

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".delete").click(function () {
            removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.clean = clean;
exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;