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
        },
        
        approval: function(req, res) {
            
            Payment.groupPaymentStatus(function(r){
                var approved = 0;
                var total = 0;
                var status = r.aggregations.group.buckets;
                var approval = "100.00";
                
                for(var x in status){
                    if (status[x].key == "approved") {
                        //soma os aprovados
                        approved = parseInt(status[x].doc_count)
                    }
                    
                    if (status[x].key != "refunded") {
                        //soma total
                        total += parseInt(status[x].doc_count)
                    }
                }
                
                //n‹o da pra dividir por zero, caso seja zero Ž 100% de aprovacao
                if (total == 0) {
                    approval = "100.00"
                }else{
                    approval = ( approved * 100 / total ).toFixed(2)
                }
                
                res.json({
                    approval: approval
                });
            });
            
        },
        
        logs: function(req, res) {
            Payment.logs(function(r){
                res.json(r);
            });
        },
        
        status: function(req, res) {
            Payment.status(function(r){
                res.json(r);
            });
        },
        
        payments_methods: function(req, res) {
            Payment.payments_methods(function(r){
                res.json(r);
            });
        }
    };

    return PaymentsController;
};