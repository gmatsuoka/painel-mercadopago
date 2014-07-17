module.exports = function (app) {

    var UserModel = {

        getBalance: function(callback) {
            
            app.mp.getAccessToken(function (err, accessToken){
                app.mp.balance(function(err, res){
                    callback(err, res)        
                });
            });
        }
    };
    return UserModel;
};