module.exports = function (app) {
    
    var MerchantOrder = app.models.merchantOrder;
    
    var MerchantOrdersController = {
        
        conversion: function(req, res) {
            
            MerchantOrder.groupMerchantOrders(function(r){
                var open = 0;
                var closed = 0;
                var status = r.aggregations.group.buckets;
                
                for(var x in status){
                    if (status[x].key == "closed") {
                        closed = parseInt(status[x].doc_count)
                    }else if (status[x].key == "opened") {
                        open = parseInt(status[x].doc_count)
                    }
                }
                
                res.json({
                    conversion: ( closed * 100 / (open+closed) ).toFixed(2)
                });
            });
            
        },
        
        logs: function(req, res) {
            MerchantOrder.logs(function(r){
                res.json(r);
            });
        }
    };

    return MerchantOrdersController;
};