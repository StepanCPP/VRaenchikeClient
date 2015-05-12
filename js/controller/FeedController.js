/**
 * Created by Alexeev on 09-May-15.
 */
var FeedController = {};

var PHOTOS = [];
var needUpdateFeedArea = true;
var photoPerPage=10;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    photoPerPage = 6;
}
FeedController.ShowFeed = function(places){

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
        getPhotosVK(place.lat,place.lng,100,place.radius,place.placeName,
            function(data){
            onPhotoProgress(endedThreads,places.length);
            endedThreads++;
            log("received photo",data);
            for(var j=0;j<data.length;j++){
                if($.grep(curPhotoArray, function(e){ return e.idApi == data[j].idApi; })
                        .length==0){

                    curPhotoArray.push(data[j]);
                }


            }
        });
    }
};

function callbackAllPhotoReceived(data)
{
    onPhotoEndSearch();
    PHOTOS = data;
    PHOTOS.sort(function(a,b){
        if (a.timestamp < b.timestamp)
            return 1;
        if (a.timestamp > b.timestamp)
            return -1;
        return 0;
    });




    log("All photo received",data);

    PhotoController.InfoAboutPhotos(PHOTOS,function(){
        Gallery.target = "#freewall";
        Gallery.init(PHOTOS);
    });

}
FeedController.ShowMore = function()
{
    Gallery.ShowMoreAsync();
};

function onPhotoBeginSearch(){

    /* $mainarea.hide();
     $loader.show();
     */

}
function onPhotoProgress(count,needed){

}
function onPhotoEndSearch()
{


}
