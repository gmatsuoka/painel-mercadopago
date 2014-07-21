$( document ).ready(function() {

    $("#menu li a").hover(function(){
        $(this).popover('show');
    }, function(){
        $(this).popover('hide');
    });
    
});