module.exports = function (app) {
    
    var Payment = app.models.payment;
    
    var PaymentsController = {
        
        search: function(req, res) {
            
            Payment.search(req.query, function(resp){
                res.json(resp);
            });
            
        },
        
        ipn_metric: function(req, res) {
            
            Payment.ipn_metric(req.query.operation_id, function(resp){
                res.json(resp);
            });
            
        },
        
        notify_again: function(req, res) {
            
            Payment.notify_again(req.query.operation_id, function(resp){
               res.json(resp);
            });
            
        },
        
        getAmountRetroactive: function (data, socket) {
            Payment.getAmountRetroactive(data.collector_id, function(resp){
                socket.emit('payment amount_retroactive', resp);
            });
        },
        
        getTpv: function (data, socket) {
            
            Payment.amount(data.collector_id, data.to, data.from, "approved", function(resp){
                
                var res = {
                    amount: resp.aggregations.group_marketplace.buckets,
                    side: data.side
                }
                
                socket.emit('payment tpv', res);
            });
        },
        
        getMoneyTransfer: function (data, socket) {
            
            Payment.amount_operation_type(data.collector_id, data.to, data.from, "money_transfer", "approved", function(resp){
                
                var res = {
                    amount: resp.aggregations.amount,
                    side: data.side
                }
                
                socket.emit('payment money_transfer', res);
            });
        },
        
        getPaymentMethods: function (data, socket) {
            
            Payment.amount_group_payment_methods(data.collector_id, data.to, data.from, "approved", function(resp){
                
                var res = {
                    amount: resp.aggregations.group_payment_method.buckets,
                    side: data.side
                }
                
                socket.emit('payment payment_methods', res);
            });
        },
    };

    return PaymentsController;
};