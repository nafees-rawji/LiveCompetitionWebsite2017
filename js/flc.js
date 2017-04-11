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
    adaptiveHeight: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

$('a').smoothScroll();

if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('#gallery').html(`<h1 class="text-white text-center section-header">FLC 2015/2016 Gallery</h1>

    <div id="nanogallery2" data-nanogallery2='{
            "thumbnailHeight": 210, "thumbnailWidth": 210,
            "thumbnailL1GutterWidth": 90,
            "thumbnailL1GutterHeight": 90,
            "itemsBaseURL": "img/flc/",
            "thumbnailStacks": 4,
            "thumbnailStacksTranslateZ": 0.3,
            "thumbnailStacksRotateX": 0.9,
            "galleryBuildInit2": "perspective_900px|perspective-origin_50% 150%"
          }'>
        <a href="flcphoto1.jpg" data-ngthumb="flcphoto1tmb-min.jpg"></a>
        <a href="flcphoto2.jpg" data-ngthumb="flcphoto2tmb-min.jpg"></a>
        <a href="flcphoto3.jpg" data-ngthumb="flcphoto3tmb-min.jpg"></a>
        <a href="flcphoto4.jpg" data-ngthumb="flcphoto4tmb-min.jpg"></a>
        <a href="flcphoto5.jpg" data-ngthumb="flcphoto5tmb-min.jpg"></a>
        <a href="flcphoto6.jpg" data-ngthumb="flcphoto6tmb-min.jpg"></a>
        <a href="flcphoto7.jpg" data-ngthumb="flcphoto7tmb-min.jpg"></a>
        <a href="flcphoto8.jpg" data-ngthumb="flcphoto8tmb-min.jpg"></a>
        <a href="flcphoto9.jpg" data-ngthumb="flcphoto9tmb-min.jpg"></a>
        <a href="flcphoto10.jpg" data-ngthumb="flcphoto10tmb-min.jpg"></a>
        <a href="flcphoto11.jpg" data-ngthumb="flcphoto11tmb-min.jpg"></a>
        <a href="flcphoto12.jpg" data-ngthumb="flcphoto12tmb-min.jpg"></a>
    </div>`)
}
