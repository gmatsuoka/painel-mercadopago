$(document).ready(function() {
    conversion();
    groupDateStatus();
    meios_de_pagamento();
});



function groupDateStatus() {
    $.ajax({
        type: "GET",
        url: "/merchant_orders/group_date_status",
        success: function(res){
            
            var dias = [];
            var list_status = {};
            var status = [];
            $.each(res.aggregations.date.buckets, function(pos, ds){
                dias.push(ds.key_as_string);
                
                $.each(ds.group.buckets, function(p, s){
                    
                    if (list_status[s.key] == undefined) {
                        list_status[s.key] = []
                    }
                    list_status[s.key].push(s.doc_count)
                });
            });

            $.each(list_status, function(p, s){
                status.push({name: p, data: s});
            });
            
            
            $('.merchant_order_column').highcharts({
                title: {
                    text: 'Merchant Order Status',
                    x: -20 
                },
                xAxis: {
                    categories: dias
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: status
            });
        }
    });
}

function conversion() {
    $.ajax({
        type: "GET",
        url: "/merchant_orders/conversion",
        success: function(res){
            var qtd = [];
            
            qtd.push(["opened", res.open]);
            qtd.push(["closed", res.closed]);
            
            $('.conversion_pie').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotShadow: false
                },
                title: {
                    text: 'Checkouts'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Porcentagem',
                    data: qtd
                }]
            });
 
        }
    });
}

function meios_de_pagamento() {
    $.ajax({
        type: "GET",
        url: "/payments/payments_methods",
        success: function(res){
            
            var qtd = [];
            var valor = [];
            
            $.each(res.aggregations.group.buckets, function(pos, pm){
                qtd.push([pm.key, pm.doc_count]);
                valor.push({name: pm.key, data: [pm.sum_transaction.sum]});
            });
            
            
            
            $('.payment_methods_pie').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotShadow: false
                },
                title: {
                    text: 'Meios de Pagamento'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Porcentagem',
                    data: qtd
                }]
            });
            
            
            $('.payment_methods_column').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Total por Meio de Pagamento'
                },
                xAxis: {
                    categories: [
                        'Atual'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Reais (R$)'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: valor
            });
        }
    });
}
