module.exports = function(app) {

    var preferences = app.controllers.preferences;

    
    app.post('/preference', preferences.create);
    
}