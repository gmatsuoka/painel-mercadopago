module.exports = function (app) {
    
    var Payment = app.models.payment;
    
    var PaymentsController = {
        
        search: function(req, res) {
            var filters = req.query;
            
            app.mp.searchPayment(filters, function(err, resp){
                res.json(resp.response);
            });
        }
    };

    return PaymentsController;
};