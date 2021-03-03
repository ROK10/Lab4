$(function() {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var cart = PizzaCart.Cart;
    // var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();


    $('.clean-order').click(function () {
        PizzaCart.clean();
    });

    $(".nav-pills li").on("click", function () {
        $(".nav-pills li").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).find('a').data('filter');
        PizzaMenu.filterPizza(selector);
    });

    $(".butt-next").click(function () {
        var name = $('#enter-name').val();
        var phone = $('#enter-phone').val();
        var address = $('#enter-address').val();
        var nameValid = checkInput(name, '.name', '#name-help');
        var phoneValid = checkInput(phone, '.phone', '#phone-help');
        var addressValid = checkInput(address, '.address', '#address-help');

        if(nameValid && phoneValid && addressValid){
            PizzaCart.createOrder(function (err, data) {
                if (err) {
                    alert("Can't create order");
                } else {
                    // data
                    alert("Order success" + JSON.stringify(data));}
            });
        }
    });
    
    function checkInput(input, a, help) {
        if(a === '.phone'){
               if (input.substr(1).match(/^\d+$/) && ((input.startsWith("0") && input.length === 10) || (input.startsWith("+380")&& input.length === 13))){
                    $('#phone-help').hide();
                    $('.phone').removeClass("has-error");
                    $('.phone').addClass("has-success");
                    return true;
                }else {
                    $('.phone').removeClass("has-success");
                    $('.phone').addClass('has-error');
                    $('#phone-help').show();
                    return false;
                }
        }else {
            if (input.match(/^[a-zA-Zа-яА-Я \-]{1,25}$/)) {
                $(help).hide();
                $(a).removeClass("has-error");
                $(a).addClass("has-success");
                return true;
            } else {
                $(a).removeClass("has-success");
                $(a).addClass('has-error');
                $(help).show();
                return false;
            }
        }
    }

    $('#enter-name').keyup(function(){
        var name = $('#enter-name').val();
        checkInput(name, '.name', '#name-help');
    });

    $('#enter-phone').keyup(function(){
        var phone = $('#enter-phone').val();
        checkInput(phone, '.phone', '#phone-help');
    });

    $('#enter-address').keyup(function(){
        var address = $('#enter-address').val();
        checkInput(address, '.address', '#address-help');
    });


});