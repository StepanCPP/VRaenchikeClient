/**
 * Created by Alexeev on 09-May-15.
 */
PhotoController = {};
PhotoController.InfoAboutPhotos = function(photos,callback)
{
    if(!photos){
        photos = PHOTOS;
    }
    if(!photos){
        return;
    }
    var outPhotos = [];
    for(var i=0;i<photos.length;i++){
        var photo = photos[i];
        var outPhoto = {};
        outPhoto.idApi = photo.idApi;
        outPhoto.ApiType = photo.type;
        outPhotos.push(outPhoto);
    }
    log("photo to send",outPhotos);
    showLoading();
    PhotoRequester.info(outPhotos,function(data){
        closeLoading();
        log("server responce Photo.info",data);
        PhotoCallback.info(data);
        if(callback){
            callback();
        }
    });
};

PhotoController.LikeDislike = function(index)
{
  if(PHOTOS && index<PHOTOS.length){
      $elem = $("#like-btn-"+index);
      var val = parseInt($elem.text());
    var photo = PHOTOS[index];
      if($elem.attr('class').indexOf(unliked_class)==-1){
          $elem.removeClass(liked_class).addClass(unliked_class);
          $elem.text(val-1);
          PhotoRequester.dislike(photo.src,photo.idApi,photo.type,function(data){
          //   alert(data);
          });

      }else{
          $elem.removeClass(unliked_class).addClass(liked_class);
          $elem.text(val+1);
          PhotoRequester.like(photo.src,photo.idApi,photo.type,function(data){
         //     alert(data);
          });
      }
  }
};