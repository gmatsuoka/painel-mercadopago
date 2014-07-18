module.exports = function(app) {

    var payments = app.controllers.payments;

    
    app.get('/payments/search', payments.search);
    
    app.get('/payments/search_movements', payments.searchMovements);
    
    /*
    * Socket.IO Events
    */
  
    app.io.sockets.on('connection', function (socket) {
        socket.on('payment get_amount_retroactive', function (data) {
            payments.getAmountRetroactive(data, socket);
        });
        
        
        socket.on('payment get_tpv', function (data) {
            payments.getTpv(data, socket);
        });
        
        socket.on('payment get_money_transfer', function (data) {
            payments.getMoneyTransfer(data, socket);
        });
        
        
        socket.on('payment get_payment_methods', function (data) {
            payments.getPaymentMethods(data, socket);
        });
    });
}