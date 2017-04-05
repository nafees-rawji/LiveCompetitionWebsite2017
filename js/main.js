$(document).ready(function(){
    $('.nav-link').smoothScroll();

    // // you have to set the heights for all the sections using jquery for the fade transitions to work
    // $('.section').each(function () {
    //     $(this).height($(this).height());
    // });
    //
    //
    // $(window).resize(function () {
    //     // you have to set the heights for all the sections using jquery for the fade transitions to work
    //     $('.section').each(function () {
    //         $(this).height("auto");
    //         $(this).height($(this).height());
    //     });
    // });

    var scroll = 0;
    var jumbotron = $('.jumbotron-main');
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

    $('.switch-content-button').click(function () {
        var text = $(this).text();
        $(this).text($(this).attr('switch-text'));
        $(this).attr('switch-text', text);
        var parent = $(this).parents(".section");
        $('html, body').stop().animate({
            scrollTop: (parent.offset().top - 75)
        }, 1200);
        $(".section-default", parent).slideToggle(1000, "linear");
        $('.section-alt', parent).slideToggle(1000, "linear");

    });

});

