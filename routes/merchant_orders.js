module.exports = function(app) {

    var merchantOrders = app.controllers.merchantOrders;    
    app.get('/merchant_orders/conversion', merchantOrders.conversion);
    app.get('/merchant_orders/logs', merchantOrders.logs);
}