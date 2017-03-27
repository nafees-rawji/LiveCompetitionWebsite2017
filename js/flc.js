$('#sponsors-past').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#sponsors-past").addClass("lightSpeedIn");
});

$('#about').appear().on('appear', function (event, $all_appeared_elements) {
    console.log("Appeared");
    $("#about").addClass("bounceIn");
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
