$('#gallery').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#gallery").addClass("lightSpeedIn");
});

$('#flc').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#flc").addClass("bounceIn");
});

$('#contact').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#contact").addClass("fadeIn");
});

$('#attend').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#attend").addClass("zoomIn");
});

$.force_appear();

$('.previous-years-gallery').slick({
    dots: true,
    adaptiveWidth: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

$('a').smoothScroll();
