/**
 * Created by Alexeev on 07-May-15.
 */
$(document).ready(function() {
    // This command is used to initialize some elements and make them work properly
    $.material.init();
    $("#radius-input").noUiSlider({
        start: 40,
        connect: "lower",
        range: {
            min: 0,
            max: max_radius_input
        }
    }).Link('lower').to($("#place-radius"));
    PlaceRequester.all(PlaceCallback.all);
    //$navplace.click();
});


