$(document).ready(function() {



    getBalance();
    getPaymentsInit();
    actions();
    actions_reload();
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


function getPaymentsInit() {
    var query = "sort=date_created";
    query += "&criteria=desc"
    query += "&offset=0"
    query += "&limit=10"
    
    var $payment = $("#payments-table");
    $.setLoading($payment);
    
    $.ajax({
        type: "GET",
        url: "/payments/search?" + query,
        success: function(res){
            
            var html = "";
            $.each(res.results, function(p, payment){
                payment = payment.collection;
                
                html += '<tr class="line-'+ payment.id +'">';
                html += getPaymentHtml(payment);
                html += '</tr>';
            });
            
            $payment.find("tbody").html(html);
            actions_reload();
        }
    });
}



function actions() {
    $(".btn-confirm-action-operation").click(function(){
        
        $('#confirm').modal('hide');
        var operation_id = $(this).attr("data-operation-id");
        
        var $payment = $(".line-" + operation_id);
        $payment.html('<td colspan="9" class="center"><span class="loading"></span></td>');
        
        var query = "operation_id=" + operation_id;
        $.ajax({
            type: "GET",
            url: "/payments/cancel?" + query,
            success: function(payment){
                
                var html = getPaymentHtml(payment);
                $payment.html(html);
                actions_reload();
            }
        });
    });
}


function actions_reload(){
    
    //Mostrando detalhes do JSON
    $(".glyphicon-resize-full").click(function(){
        
        var html = $(this).attr("data-value-json");
        $("#modal_show_json").find(".modal-body").html("<pre>" + html + "</pre>");
        $('#modal_show_json').modal('toggle');
    });
    
    
    //Pegando movements do pagamento
    $(".glyphicon-th-list").click(function(){
    
        var $movements = $("#movements-table");
        $.setLoading($movements);
        
        var query = "reference_id=" + $(this).attr("data-operation-id");
        query += "&sort=date_released";
        query += "&criteria=desc";
        
        $.ajax({
            type: "GET",
            url: "/payments/search_movements?" + query,
            success: function(res){
                
                var html = "";
                $.each(res.results, function(p, movement){
                    html += '<tr class="' + movement.type + '">';
                    html += '<td> '+ movement.id +' </td>';
                    html += '<td> '+ movement.type +' </td>';
                    html += '<td>R$ '+ movement.amount +' </td>';
                    html += '<td> '+ moment(movement.date_created).format("YYYY-MM-DD HH:mm:ss") +' </td>';
                    html += "<td class=\"center\"><span class=\"glyphicon glyphicon-resize-full\" data-value-json='" + JSON.stringify($.makeArray(movement), null, '\t') + "'></span></td>";
                    html += '</tr>'; 
                });
                
                $movements.find("tbody").html(html);
                actions_reload();
            }
        });
    });
    
    
    
    //Botao para cancelamento ou devolu��o do pagamento
    $(".glyphicon-edit").click(function(){
        var operation_id = $(this).attr("data-operation-id");
        $(".btn-confirm-action-operation").attr("data-operation-id", operation_id);
        actions_reload();
    });
    
}



function getPaymentHtml(payment) {
    
    var html = "";
    
    html += '<td> '+ payment.id +' </td>';
    html += '<td> '+ payment.payer.email +' </td>';
    html += '<td> '+ payment.status +' </td>';
    html += '<td> '+ payment.status_detail +' </td>';
    html += '<td> '+ moment(payment.date_created).format("YYYY-MM-DD HH:mm:ss") +' </td>';
    html += '<td> R$ '+ payment.transaction_amount +' </td>';
    html += '<td class="center"><span class="glyphicon glyphicon-th-list" data-toggle="modal" data-target="#movements" data-operation-id="'+payment.id+'"></span></td>';
    
    html += '<td class="center">';
    if (payment.status != "refunded" && payment.status != "cancelled") {
        html += '<span class="glyphicon glyphicon-edit" data-toggle="modal" data-target="#confirm" data-operation-id="'+payment.id+'"></span>'    
    }
    html += '</td>';
    
    html += "<td class=\"center\"><span class=\"glyphicon glyphicon-resize-full\" data-value-json='" + JSON.stringify($.makeArray(payment), null, '\t') + "'></span></td>";
    
    return html;
}