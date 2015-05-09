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