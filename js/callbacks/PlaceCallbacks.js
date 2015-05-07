/**
 * Created by Alexeev on 07-May-15.
 */
PlaceCallback = {};
var PLACES = [];
PlaceCallback.all = function(data){
   if(isSuccess(data)){
       PLACES.length=0;
       PLACES = data.message;


   }
};
PlaceCallback.remove = function(data){

};

PlaceCallback.add = function(data){

};
PlaceCallback.update = function(data){

};