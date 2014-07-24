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
        
        notification: function(req, res){
            var filters = req.query;
            
            if (filters.topic == "payment") {
                app.mp.getPayment(filters.id, function(err, json){
                    Payment.insertPayment(json.response.collection, function(err, resp){
                        res.send(json.response.collection);
                    });
                });
            }else if (filters.topic == "merchant_order") {
                app.mp.getMerchantOrder(filters.id, function(err, json){
                    Payment.insertMerchantOrder(json.response, function(err, resp){
                        res.send(json.response);
                    });
                });
            }
            
            //notifica todos que tem novas "coisas"
            for(var x in app.notify_me){
                var params = filters;
                app.io.sockets.socket(app.notify_me[x]).emit('notify', params);
            }
        }
    };

    return PaymentsController;
};