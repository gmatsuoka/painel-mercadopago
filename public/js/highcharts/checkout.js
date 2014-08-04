$(document).ready(function() {

    //cria qrcode para pagina de checkout
    create_qrcode("http://painelmp.herokuapp.com/checkout");
    
    //pega o evento do formulario
    $("#create_preference").submit(create_preference);
    
    
    //esconde o loading
    $(".box-loading").hide();
     
});


function create_preference(e) {
    //remove action do formulario
    e.preventDefault();
    
    //esconde o botao
    $(".btn-send").hide();
    
    //setta loading
    $(".box-loading").fadeIn();
    
    $.ajax({
        type: "POST",
        data: {
            titulo: $("#titulo").val(),            
            valor: $("#valor").val(),
            email: $("#email").val()
        },
        url: "/preference",
        success: function(res){
            
            window.location.replace(res.init_point);
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
            
            $("#qrcode").empty().append(html);
        }
    });
}