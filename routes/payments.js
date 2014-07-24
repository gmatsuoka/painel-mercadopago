module.exports = function(app) {

    var payments = app.controllers.payments;

    
    app.get('/payments/search', payments.search);
    
    app.get('/payments/search_movements', payments.searchMovements);
    
    //tanto get quanto post, aceitando notificacao
    //get para testes
    //post é usado em produção para receber notificaçoes do MercadoPago
    app.get('/notification', payments.notification);
    app.post('/notification', payments.notification);
    
}