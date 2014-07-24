$(document).ready(function() {

    $("#create_preference").submit(create_preference);
    
});


function create_preference(e) {
    e.preventDefault();
    
    
    $.setLoading($("#qrcode"));
    $.ajax({
        type: "POST",
        data: {
            titulo: $("#titulo").val(),            
            valor: $("#valor").val(),
            email: $("#email").val()
        },
        url: "/preference",
        success: function(res){
            create_qrcode(res.init_point);
        }
    });
}



function create_qrcode(link){
    $.ajax({
        type: "POST",
        
        data: {
            link: link
        },
        url: "/qrcode",
        success: function(res){
            
            var html = "<h4>Acesse através do QR Code </h4>";
            html += res;
            html += '<h4>Através do Link para o checkout</h4>';
            html += '<a href="' + link +'" name="MP-Checkout" class="lightblue-M-Ov-BrOn" mp-mode="modal">Pagar</a>';
            html += '\
                <!-- JS para MERCADOPAGO --> \
                <script type="text/javascript" src="http://mp-tools.mlstatic.com/buttons/render.js"></script> \
            ';
            
            
            $("#qrcode").empty().append(html);
        }
    });
}