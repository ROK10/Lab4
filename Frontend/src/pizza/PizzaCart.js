var Templates = require('../Templates');
var LocalStorage = require('./LocalStorage');
var API = require('../API');
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var Cart = [];

var $cart = $("#cart");

//Очистити кошик покупок
function clean() {
    Cart = [];
    updateCart();
}

//Додавання однієї піци в кошик покупок
function addToCart(pizza, size) {
    var bool = true;
    Cart.forEach(function (pizza_cart) {
        if(pizza.id === pizza_cart.pizza.id && size=== pizza_cart.size){
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

    updateCart();
}

function removeFromCart(cart_item) {
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
    var saved = LocalStorage.get('cart');
    if(saved) {
        Cart = saved;
    }

    updateCart();
}

function getPizzaInCart() {
    return Cart;
}
function sum(){
    var res = 0;
    Cart.forEach(function (pizza_cart) {
         res += pizza_cart.pizza[pizza_cart.size].price*pizza_cart.quantity;
    });
    return res;
}

function updateCart() {
    $(".order-label .count").text(Cart.length);
    $('#count-sum').text(sum() + " грн.");
    LocalStorage.set("cart", Cart);

    $cart.html("");
    if($(".order-label .count").text()==="0"){
        $("#butt-order").attr("disabled", "");
        $cart.html("<div id=\"is-empty\"><p>Пусто в холодильнику?</p><p>Замов піцу!</p></div>");
    } else {
        $("#butt-order").removeAttr("disabled");
        $("#is-empty").hide();

        function showOnePizzaInCart(cart_item) {
            var html_code = $("#butt-order").html() !== undefined ? Templates.PizzaCart_OneItem(cart_item) : Templates.PizzaCart_toBuy(cart_item);

            var $node = $(html_code);

            $node.find(".plus").click(function () {
                cart_item.quantity += 1;

                updateCart();
            });
            $node.find(".minus").click(function () {
                if (cart_item.quantity === 1) {
                    removeFromCart(cart_item);
                } else {
                    cart_item.quantity -= 1;
                }

                updateCart();
            });
            $node.find(".delete").click(function () {
                removeFromCart(cart_item);

                updateCart();
            });

            $cart.append($node);
        }

        Cart.forEach(showOnePizzaInCart);
    }
}

function createOrder(callback) {
    API.createOrder({
        name: $('#enter-name').val(),
        phone: $('#enter-phone').val(),
        address : $('#enter-address').val(),
        price: $('#count-sum').text(),
        order: Cart
    }, function (err, result) {
        if(err){
            return callback(err);
        }
         callback(null, result);
    })
}

$("#butt-order").click(function () {
    initialiseCart();
});
$("#butt-edit-order").click(function () {
    initialiseCart();
});


exports.Cart = Cart;
exports.clean = clean;
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
exports.createOrder = createOrder;