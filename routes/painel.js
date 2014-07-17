module.exports = function(app) {

    var panel = app.controllers.panel;

    
    app.get('/', panel.index);
    
}