$(document).ready(function() {

    
    consult();
     
    $(".select-log").click(function(){
        $(".select-log").removeClass("active");
        $(this).addClass("active");
        consult();
    });
});

function consult() {
    
    var selected = $(".select-log.active").html();
    
    if (selected == "Payments") {
        get_payments();
    }else{
        get_merchant_orders();
    }
}

function get_payments() {
    
    $logs = $("#logs-table");
    $.setLoading($logs);
    $.ajax({
        type: "GET",
        url: "/payments/logs",
        success: function(r){
            var html = "";
            
            $.each(r.hits.hits, function(p, payment){
                payment = payment._source;
                
                html += "<tr>";
                html += "<td>" + payment.id + "</td>" ;
                html += "<td>" + payment.last_modified + "</td>" ;
                html += "<td>" + payment.status + "</td>" ;
                html += "<td>" + payment.status_detail + "</td>" ;
                html += "<td class=\"center\"><span class=\"glyphicon glyphicon-resize-full\" data-value-json='" + JSON.stringify($.makeArray(payment), null, 2) + "'></span></td>";
                html += "</tr>";
                
            });
            
            $logs.find("tbody").html(html);
            actions_reload();
        }
    });
}


function get_merchant_orders(){
    $logs = $("#logs-table");
    $.setLoading($logs);
    
    $.ajax({
        type: "GET",
        url: "/merchant_orders/logs",
        success: function(r){
            var html = "";
            
            $.each(r.hits.hits, function(p, order){
                order = order._source;
                console.log(order);
                html += "<tr>";
                html += "<td>" + order.id + "</td>" ;
                html += "<td>" + order.last_updated + "</td>" ;
                html += "<td>" + order.status + "</td>" ;
                html += "<td></td>" ;
                html += "<td class=\"center\"><span class=\"glyphicon glyphicon-resize-full\" data-value-json='" + JSON.stringify($.makeArray(order), null, 2) + "'></span></td>";
                html += "</tr>";
                
            });
            
            $logs.find("tbody").html(html);
            actions_reload();
        }
    });
}


function actions_reload(){
    
    //Mostrando detalhes do JSON
    $(".glyphicon-resize-full").unbind("click");
    $(".glyphicon-resize-full").click(function(){
        var html = $(this).attr("data-value-json");
        $("#modal_show_json").find(".modal-body").html("<pre>" + html + "</pre>");
        $('#modal_show_json').modal('toggle');
    });
}