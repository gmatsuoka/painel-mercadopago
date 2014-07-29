module.exports = function(app) {

    var payments = app.controllers.payments;

    
    app.get('/payments/search', payments.search);
    app.get('/payments/search_movements', payments.searchMovements);
    app.get('/payments/cancel', payments.cancel);
    app.get('/payments/approval', payments.approval);
    app.get('/payments/logs', payments.logs);
    
}