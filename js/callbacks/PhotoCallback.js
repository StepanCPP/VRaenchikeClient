/**
 * Created by Alexeev on 09-May-15.
 */
PhotoCallback = {};
var FAVORITEPHOTOS = [];
var LIKEDPHOTOS = [];
PhotoCallback.info =function(data){
    data = JSON.parse(data);
    if(isSuccess(data)){
        data = JSON.parse(data.message);

        FAVORITEPHOTOS = data.favoritePhotos;
        LIKEDPHOTOS = data.favoritePhotos;
        if(PHOTOS){
          for(var i=0;i<PHOTOS.length;i++){
              var photo = PHOTOS[i];
              for(var j=0;j<LIKEDPHOTOS.length;j++)
              {
                  var likedPhoto = LIKEDPHOTOS[j];
                  if((photo.idApi+"")==likedPhoto.idApi && photo.type == likedPhoto.ApiType){
                      photo.id = likedPhoto.id;
                      photo.likes = likedPhoto.likes;
                  }
              }
          }
        }

    }
};
PhotoCallback.Favorite = {};
PhotoCallback.Favorite.add = function(data){
    data = JSON.parse(data);
    if(isSuccess(data)){
        alert("photo added to favorite");
    }
};
PhotoCallback.Favorite.all = function(data){

};