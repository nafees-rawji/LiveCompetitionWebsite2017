$(document).ready(function(){
    $('a').smoothScroll();

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

    $(function () {
        $(window).scroll(function () {
            console.log("Scrolled");
            console.log($(window).scrollTop());
            console.log($(window).height());
            // set distance user needs to scroll before we start fadeIn
            if ($(window).scrollTop() > $(window).height()) {
                $('.navigation').css('background-color', 'rgba(0, 0, 0, 0.6)');
            } else {
                $('.navigation').css('background-color', 'rgba(0, 0, 0, 0)');
            }
        });
    });

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


    var options = {
        strings: [ "Welcome to a competition.", "Welcome to^500 an experience.", "Welcome to^500 an opportunity.", "Welcome to^500 LIVE."],
        startDelay: -1,
        typeSpeed: 90,
        backSpeed: 90
    };

    var typed = new Typed("#welcome-to-live-text", options);

    particlesJS.load('home', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
});



