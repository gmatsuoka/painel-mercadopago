module.exports = function (app) {

    var PaymentModel = {

        insertPayment: function(payment, callback) {
            
            var payments = this;
                            
            app.es.index({
                index: 'payments',
                type: 'payment',
                id: payment.id,
                body: payment
            }, function (error, response) {
                if (error) {
                    console.trace('error: ', error);
                    return;
                }
                
                //insert log
                payments.insertLog("payments", payment, function(){});
                
                callback(response);
            });
        },
        
        insertMerchantOrder: function(order, callback){
            
            var payments = this;
                            
            app.es.index({
                index: 'merchant_orders',
                type: 'merchant_order',
                id: order.id,
                body: order
            }, function (error, response) {
                if (error) {
                    console.trace('error: ', error);
                    return;
                }
                
                //insert log
                payments.insertLog("merchant_orders", order, function(){});
                
                callback(response);
            });
        },
        
        insertLog: function(type, json, callback){
            app.es.index({
                index: 'logs',
                type: type,
                body: json
            }, function (error, response) {
                if (error) {
                    console.trace('error: ', error);
                    return;
                }
                
                callback(response);
            });
        }
        
    };
    return PaymentModel;
};