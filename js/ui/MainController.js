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
function callbackAllPhotoReceived(data)
{
    onPhotoEndSearch();
    PHOTOS = data[0];
    log("All photo received",data);
    Gallery.init(PHOTOS);
}
