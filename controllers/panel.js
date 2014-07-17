module.exports = function (app) {
    
    var PanelController = {
        
        index: function(req, res) {
            res.render('index');
        }
    };

    return PanelController;
};