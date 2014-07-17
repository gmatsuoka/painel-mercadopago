(function ($) {

    $.setLoading = function (el) {
        
        
        var qtd_td = el.find("th").length;
        
        //caso seja um elemento normal... 
        if (qtd_td <= 0) {
            el.html('<span class="loading"> </span>');
        }else{
            el.find("tbody").html('<tr><td class="center" colspan="' + qtd_td + '"> <span class="loading"> </span></td></tr>');    
        }
        
    
    };

})(jQuery);