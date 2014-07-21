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
            console.log(res);
            
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
            console.log(res);
            $("#qrcode").empty().append(res);
        }
    });
}