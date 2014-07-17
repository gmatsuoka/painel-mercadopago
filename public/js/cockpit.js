$(document).ready(function() {



    getBalance();

});





function getBalance(){
    var $balance = $("#balance");
    
    $.setLoading($balance.find(".circle-text"));
    
    $.ajax({
        type: "GET",
        url: "/user/balance",
        success: function(res){
            $balance.find(".circle-text").html("R$ " + res.total_amount);
        }
    });
    
}