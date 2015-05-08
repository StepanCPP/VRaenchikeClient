/**
 * Created by Alexeev on 07-May-15.
 */
PlaceCallback = {};
var PLACES = [];
PlaceCallback.all = function(data){
   data = JSON.parse(data);
    console.log(data);
   if(isSuccess(data)){
       PLACES.length=0;
       PLACES = JSON.parse(data.message);
       ShowFeed();
   }
};
PlaceCallback.remove = function(data){

};

PlaceCallback.add = function(data){

};
PlaceCallback.update = function(data){
    data = JSON.parse(data);

    if(isSuccess(data)){
        var place = JSON.parse(data.message);
        if(PLACES)
            for(var i=0;i<PLACES.length;i++){
                if(PLACES[i].idPlace==place.idPlace){
                    PLACES[i] = place;
                    break;
                }
            }
    }
    console.log("photo.update server response",data);
};