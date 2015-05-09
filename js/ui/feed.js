/**
 * Created by Alexeev on 09-May-15.
 */
$button_show_more = $("#btn-more-photo"),
$button_link_vk = $("#linkVkButton"),
$button_link_gmaps = $("#linkGoogleMap");
$button_show_more.on('click',function(){
    FeedController.ShowMore();
});
$button_link_vk.on('click',function(){
    if(Gallery.photoSwipe.currItem.vkid>0)
        $(this).attr("href", "http://vk.com/id"+ Gallery.photoSwipe.currItem.vkid);
    else
        return false;
});

$button_link_gmaps.on('click',function(){
    $(this).attr("href", 'http://www.google.com/maps/place/'
    +Gallery.photoSwipe.currItem.lat+","+Gallery.photoSwipe.currItem.long );
});

