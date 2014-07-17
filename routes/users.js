module.exports = function(app) {

    var users = app.controllers.users;
    
    app.get('/user/balance', users.balance);

}