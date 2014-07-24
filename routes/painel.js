module.exports = function(app) {

    var panel = app.controllers.panel;

    
    app.get('/', panel.index);
    
    app.get('/checkout', panel.checkout);
    
    app.post('/qrcode', panel.generateQrCode);
    
    //
    app.io.sockets.on('connection', function (socket) {
        
        socket.on('notify-me', function(){
            if (app.notify_me.indexOf(socket.id) == -1) {
                app.notify_me.push(socket.id)
            }
        });
    
        socket.on('disconnect', function(){
            //remove da notificacao
            var i = app.notify_me.indexOf(socket.id);
            if(i != -1) {
              app.notify_me.splice(i, 1);
            }
        });
    
    });
}