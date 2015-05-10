/**
 * Created by Alexeev on 09-May-15.
 */

FAVORITEPHOTOS = [];
PhotoFavoriteController = {};
PhotoFavoriteController.addToFavorite = function(url,id,PhotoService){
    showLoading();
    log('start adding','');
    PhotoRequester.favorite.add(url,id,PhotoService,function(data){

        log('server response',data);
        PhotoCallback.Favorite.add(data);
        closeLoading();
    });
};

PhotoFavoriteController.Add = function(index){
  if(!PHOTOS || index>=PHOTOS.length){
      handle_error("-1","can't add not exist photo to favorite");
    return;
  }
    var photo = PHOTOS[index];
    log("photo add to favorite",photo);

    if(photo.src && photo.idApi && photo.type)
    PhotoFavoriteController.addToFavorite(photo.src,photo.idApi,photo.type);
};



PhotoFavoriteController.All = function()
{
    showLoading();
    PhotoRequester.favorite.all(200,0,function(data){
        PhotoCallback.Favorite.all(data);



    });
};
