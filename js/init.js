/**
 * Created by Alexeev on 07-May-15.
 */
$(document).ready(function() {
    // This command is used to initialize some elements and make them work properly
    $.material.init();
    $("#radius-input").noUiSlider({
        connect: "lower",
        step:10,
        start:40,
        range: {
            min: 0,
            max: max_radius_input
        }
    })
        .Link('lower').to($("#place-radius"))
        .on({set:function(){
            setRadius(parseFloat($("#radius-input").val()));
        }});

    PlaceRequester.all(PlaceCallback.all);
    //$navplace.click();
});


