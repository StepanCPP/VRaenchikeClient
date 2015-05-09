/**
 * Created by Alexeev on 07-May-15.
 */

PhotoServices = {
    Vkontakte:"v",
    Instagram:"i"
};



var loadingShows = false;
function showLoading(){
    loadingShows = true;
    currentShowsArea.fadeOut(400,function(){

        $loader.fadeIn(400,function(){
            loadingShows = false;
        });
    });
}
function closeLoading(callback){

    var timeout = 10;
    if(loadingShows) {
        timeout=800;
    }
    setTimeout(function(){
            $loader.fadeOut(400,function(){
                currentShowsArea.fadeIn(400,callback);
            });
        },timeout);
}

