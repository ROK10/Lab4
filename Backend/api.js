var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List); //Відправити назад все, що міститься в Pizza_List
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true,
        name: order_info.name,
        phone: order_info.phone,
        address: order_info.address,
        pizzas: order_info.order.length,
        price: order_info.price
    });
};