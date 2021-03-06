module.exports = function (app) {

    var MerchantOrderModel = {
        
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
        
        
        groupMerchantOrders: function(callback){
            app.es.search({
                index: 'merchant_orders',
                type: 'merchant_order',
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
        
        groupDateStatusMerchantOrder: function(callback){
            app.es.search({
                index: 'merchant_orders',
                type: 'merchant_order',
                body: {
                    aggs: {
                        date: {
                            date_histogram: {
                                field: "date_created",
                                interval: "day",
                                format: "yyyy-MM-dd"
                            },
                            aggs: {
                                group: {
                                    terms: {
                                        field: "status"
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
                type: 'merchant_orders',
                body: {
                        sort: [
                            {
                                "last_updated": {
                                    "order": "desc"
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
    return MerchantOrderModel;
};