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
        
        groupPaymentStatus: function(callback){
            app.es.search({
                index: 'payments',
                type: 'payment',
                body: {
                    aggs: {
                        group: {
                            terms: {
                                field: "status"
                            },
                            aggs: {
                                count: {
                                    value_count: {
                                        field: "id"
                                    }
                                }
                            }
                        }
                    },
                    size: 0
                }
            }, function (error, response) {
                if (error) {
                    console.trace('error: ', error);
                    return;
                }
                
                callback(response);
            });
            
        },
        
        logs: function(callback){
            app.es.search({
                index: 'logs',
                type: 'payments',
                body: {
                        sort: [
                            {
                                last_modified: {
                                    "order": "asc"
                                }
                            }
                        ],
                        query: {
                            bool: {
                                must: [
                                    {
                                        match_all: {}
                                    }
                                ]
                            }
                        }
                    }
            }, function (error, response) {
                if (error) {
                    console.trace('error: ', error);
                    return;
                }
                
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