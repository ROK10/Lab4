

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();
    $('.clean-order').click(function () {
        PizzaCart.clean();
    });
    
    $(".nav-pills li").on("click", function() {
        $(".nav-pills li").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).find('a').data('filter');
        PizzaMenu.filterPizza(selector);
    });
});