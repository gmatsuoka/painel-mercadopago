module.exports = function (app) {
    
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
            
            code.pipe(res);
        }
    };

    return PanelController;
};