module.exports = function (app) {
    
    var Payment = app.models.payment;
    
    var PaymentsController = {
        
        search: function(req, res) {
            var filters = req.query;
            
            app.mp.searchPayment(filters, function(err, resp){
                res.json(resp.response);
            });
        },
        
        
        searchMovements: function(req, res) {
            var filters = req.query;
            
            app.mp.searchMovements(filters, function(err, resp){
                res.json(resp.response);
            });
            
        },
        
        
        cancel: function(req, res){
            var filters = req.query;
            
            app.mp.getPayment(filters.operation_id, function(err, resp){
                var payment = resp.response.collection;
                
                //caso seja aprovado refund
                //caso seja outros status, cancela
                if (payment.status == "approved") {
                    app.mp.refundPayment(payment.id, function(err, resp){
                        res.json(resp.response);
                    });
                }else{
                    app.mp.cancelPayment(payment.id, function(err, resp){
                        res.json(resp.response);
                    });
                }
            });
        }
    };

    return PaymentsController;
};