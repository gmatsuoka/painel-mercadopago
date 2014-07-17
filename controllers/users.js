module.exports = function (app) {
    
    var User = app.models.user;
    
    var UsersController = {
        
        balance: function(req, res) {
            app.mp.balance(function(err, resp){
                res.json(resp.response);
            });
        }
        
    };

    return UsersController;
};