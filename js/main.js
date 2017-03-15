$(document).ready(function(){
    $('a').smoothScroll();


    var scroll = 0;
    var jumbotron = $('.jumbotron');
    var offset = jumbotron.offset();
    if (jumbotron.length != 0){
        $(document).scroll(function() {
            //get how far the user has scrolled
            scroll= $(this).scrollTop();
            if(scroll > jumbotron.height()) {
                $('.navigation').css('background-color', 'rgba(0, 0, 0, 0.6)');
            } else {
                $('.navigation').css('background-color', 'rgba(0, 0, 0, 0)');
            }
        });
    }
});

