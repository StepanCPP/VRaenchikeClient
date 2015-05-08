/**
 * Created by Alexeev on 07-May-15.
 */
var $navbar = $(".nav-main-menu"),
    $loader = $(".loader"),
    $mainarea = $(".main-area"),
    $navphoto = $("#nav-photo"),
    $navfeed = $("#nav-feed"),
    $navplace = $("#nav-place"),
    $photo_place_feed = $(".photo-place-feed-place"),
    $photo_area = $("#photo"),
    $place_area = $("#places"),
    $place_items = $("#places-list"),
    $feed_area = $("#freewall");
//==================================ON CLICK BEGIN===============================//
$navbar.on('click',function(){
    $navbar.removeClass('active');
    $(this).addClass('active');

});
$navphoto.on('click',function(){
    $photo_place_feed.fadeOut(400);;

    $photo_area.fadeIn(400);

});
$navplace.on('click',function(){
    $photo_place_feed.fadeOut(400);
    ShowPlaces();
    $place_area.fadeIn(400);
    google.maps.event.trigger(map, 'resize');
    map.setZoom( map.getZoom() );
});
$navfeed.on('click',function(){
    $photo_place_feed.fadeOut(400);
    $feed_area.fadeIn(400);
    if(needUpdateFeedArea){
        PlaceController.all(PlaceCallback.all);
    }
});


//==================================ON CLICK END===============================//

