module.exports = function (app) {
    
    var PreferencesController = {
        
        
        //funcao para criar preferencia :P
        create: function(req, res) {
            
            //criando com pouquissimos dados.
            var preference = {
                "items": [{
                    "title": req.body.titulo,
                    "quantity": parseInt(1),
                    "unit_price": parseFloat(req.body.valor)
                }],
                "payer":{
                    "email": req.body.email
                }
            };

            app.mp.createPreference (preference, function (err, data){
                if (err) {
                    console.log (err);
                } else {
                    res.json(data.response);
                }
            });
        }
    };

    return PreferencesController;
};