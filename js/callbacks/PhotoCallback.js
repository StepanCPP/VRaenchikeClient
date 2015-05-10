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
        if(data.likedPhotos)
            LIKEDPHOTOS = data.likedPhotos;
        if(PHOTOS){
          for(var i=0;i<PHOTOS.length;i++){
              var photo = PHOTOS[i];

              for(var j=0;j<LIKEDPHOTOS.length;j++)
              {
                  var likedPhoto = LIKEDPHOTOS[j];
                  if((photo.idApi+"")==likedPhoto.idApi && photo.type == likedPhoto.ApiType){
                      photo.id = likedPhoto.id;
                      photo.likes = likedPhoto.likes;
                      photo.liked = likedPhoto.liked;
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
    data = JSON.parse(data);
    if(isSuccess(data)){
        data = JSON.parse(data.message);
        log("send image to vk",data);
        getInfoAboutPhotos(data,function(imgs){
            for(var i=0;i<imgs.length;i++){
                var img = imgs[i];


                for(var j=0;j<data.length;j++){
                    if(data[j].idApi==img.idApi){
                        img.likes = data[j].likes;
                        img.liked=data[j].liked;
                    }
                }
            }


            Gallery.target = "#freewall-photo";
            PHOTOS = imgs;
            Gallery.init(imgs);
            closeLoading();
        });


    }
};