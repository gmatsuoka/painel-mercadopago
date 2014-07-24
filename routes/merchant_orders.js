module.exports = function(app) {

    console.log(app.controllers);
    var merchantOrders = app.controllers.merchantOrders;

    
    app.get('/merchant_orders/conversion', merchantOrders.conversion);
    
    
    
}