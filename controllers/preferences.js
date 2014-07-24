module.exports = function (app) {
    
    var PreferencesController = {
        
        
        //funcao para criar preferencia :P
        create: function(req, res) {
            
            
            //criando com pouquissimos dados.
            var preference = {
                "items": [{
                    "title": req.body.titulo, // *1
                    "quantity": parseInt(1),
                    "unit_price": parseFloat(req.body.valor),
                    "category_id": "others", // *2
                    "currency_id": "BRL",
                    "description": "Venda do Meu Celular", // *1
                    "id": "123",
                    "picture_url": "http://mlb-s1-p.mlstatic.com/baixou-samsung-galaxy-note-2-n7105-4g-lte-16gb-tela-55-13202-MLB20074558956_042014-O.jpg" // *1
                }],
                "payer":{
                    
                    "name": "Nometeste", // *1
                    "surname": "Sobrenometeste", // *1
                    "email": req.body.email, // *1
                    "date_created": "2014-03-05T13:15:30", // *1
                    "phone": {
                        "area_code": "11", // *1
                        "number": "35550000" // *1
                    },
                    "identification": {
                        "type": "CPF", // *1
                        "number": "24564447874" // *1
                    },
                    "address": {
                        "street_name": "Av Teste", // *1
                        "street_number": "32", // *1
                        "zip_code": "06541005" // *1
                    }
                    
                },
                
                "shipments": {
                    "receiver_address": {
                        "zip_code": "06541005", // *3
                        "street_number": "321", // *3
                        "street_name": "Av do senhor joao", // *3
                        "floor": "1", // *3
                        "apartment": "0" // *3
                    }
                },
                
                "external_reference": "1234", // *4
                "notification_url": "http://painelmp.herokuapp.com/notification" // *5
            };

            // Glossario
            // *1 - dados fictício, porém muito importante para conversão e aprovação
            // *2 - Veja a lista das categorias disponiveis: https://api.mercadolibre.com/item_categories
            // *3 - dados fictício, porém muito importante para aprovação
            // *4 - Numero do pedido da loja
            // *5 - Url de notificação de pagamentos e merchant_orders
            
            
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