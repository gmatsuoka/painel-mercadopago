module.exports = function (app) {
    
    
    var Payment = app.models.payment;
    var MerchantOrder = app.models.merchantOrder;
    
    var PanelController = {
        
        index: function(req, res) {
            res.render('index');
        },
        
        checkout: function(req, res) {
            res.render('checkout');
        },
        
        generateQrCode: function(req, res) {
            
            var qr = require('qr-image');  
            
            var code = qr.image(req.body.link, { type: 'svg' });
            
            res.type('text');
            code.pipe(res);
        },
        
        notification: function(req, res){
            var filters = req.query;
            var Panel = this;
            if (filters.topic == "payment") {
                app.mp.getPayment(filters.id, function(err, json){
                    Payment.insertPayment(json.response.collection, function(err, resp){
                        Panel.notify(filters);
                        res.send(json.response.collection);
                    });
                });
            }else if (filters.topic == "merchant_order") {
                app.mp.getMerchantOrder(filters.id, function(err, json){
                    MerchantOrder.insertMerchantOrder(json.response, function(err, resp){
                        Panel.notify(filters);
                        res.send(json.response);
                    });
                });
            }
            
            
        },
        
        notify: function(filters){
            //notifica todos que tem novas "coisas"
            for(var x in app.notify_me){
                var params = filters;
                app.io.sockets.socket(app.notify_me[x]).emit('notify', params);
            }
        }
    };

    return PanelController;
};