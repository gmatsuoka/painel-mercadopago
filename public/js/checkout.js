$(document).ready(function() {

    create_qrcode("http://painelmp.herokuapp.com/checkout");
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