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
    $feed_area = $("#feed");
//==================================ON CLICK BEGIN===============================//
$navbar.on('click',function(){
    $navbar.removeClass('active');
    $(this).addClass('active');

});

var currentShowsArea = $feed_area;

$navphoto.on('click',function(){

    currentShowsArea.fadeOut(400,function(){
        currentShowsArea = $photo_area;
        PhotoFavoriteController.All();
    });
});
$navplace.on('click',function(){
    $photo_place_feed.fadeOut(400);
    PlaceController.ShowPlaces();
    $place_area.fadeIn(400);
    google.maps.event.trigger(map, 'resize');
    map.setZoom( map.getZoom() );
    placeItemClicked(0);
    currentShowsArea = $place_area;
});
$("#vraenchike_home").on('click',function(){
  
   $navfeed.click();
});
$navfeed.on('click',function(){

        currentShowsArea.fadeOut(400,
            function(){
            currentShowsArea = $feed_area;

            showLoading();
            if(needUpdateFeedArea){

                PlaceRequester.all(
                    function(data){
                        PlaceCallback.all(data);
                            closeLoading(function(){
                                if(Gallery.wall){
                                    Gallery.wall.fitWidth();
                                }


                                    $button_show_more.show();


                            });

                    });
            }else{

                closeLoading();
            }
        });





});


//==================================ON CLICK END===============================//

