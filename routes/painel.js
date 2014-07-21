module.exports = function(app) {

    var panel = app.controllers.panel;

    
    app.get('/', panel.index);
    
    app.get('/checkout', panel.checkout);
    
    app.post('/qrcode', panel.generateQrCode);
    
}