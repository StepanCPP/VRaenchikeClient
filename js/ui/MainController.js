/**
 * Created by Alexeev on 07-May-15.
 */

var PHOTOS = [];
//When we click on navbar
var needUpdateFeedArea = false;
function ShowFeed(places)
{

    if(!places){
        places = PLACES;
    }
    //looking for ends of getPhotoVk thread pull
    var endedThreads = 0;
    var threadWatcher = setInterval(function(){
        if(endedThreads>=places.length)
        {
            console.log('all data received!');

            clearInterval(threadWatcher);

            callbackAllPhotoReceived(curPhotoArray);

        }

        console.log('current ended threads : '+endedThreads);
    },500);
    var curPhotoArray = [];
    for(var i=0;i<places.length;i++)
    {
        var place = places[i];
        onPhotoBeginSearch();
        getPhotosVK(place.lat,place.lng,200,place.radius,function(data){
            onPhotoProgress(endedThreads,places.length);
            endedThreads++;
            log("received photo",data);
            curPhotoArray.push(data);
        });
    }
}
function ShowPlaces(places)
{
    if(!places){
        places = PLACES;
    }

    $place_area.children().remove();
    for(var i=0;i<places.length;i++){
        var text="",title=places[i].placeName;
        var html='<div class="row"> <div class="col-sm-3"> <div class="list-group-item hvr-shadow" style="cursor: pointer;"><div class="row-content"><h4 class="list-group-item-heading">'+
            title+'</h4><p class="list-group-item-text">'+
            text+'</p></div></div> </div> </div>';

        $place_area.append(html);
    }

}
function callbackAllPhotoReceived(data)
{
    onPhotoEndSearch();
    PHOTOS = data[0];
    log("All photo received",data);
    Gallery.init(PHOTOS);
}
