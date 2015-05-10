/**
 * Created by Alexeev on 05-May-15.
 */
Gallery = {};
Gallery.target = "#freewall";
Gallery.wall = null;
Gallery.lastPhotoIndex = 0;
Gallery.images = [];
var liked_class = "mdi-action-favorite",
    unliked_class = "mdi-action-favorite-outline";



Gallery.GetHtml=function(thumbnail,title,date,placeName,index,photos){
    $html_likes ='';
    var likes = 0;
    var isLiked = false;

    if(photos && index<photos.length){
        var photo = photos[index];
        if(photo.likes){
            likes = photo.likes;
        }
        if(photo.liked){
            isLiked = true;
        }
    }
    $html_likes = '<i onclick="PhotoController.LikeDislike('+index+')" id="like-btn-'+index+'" class="like-button '+(isLiked?liked_class:unliked_class)+'">'+likes+'</i>';



    $html = '<div class="brick"><img  onclick="Gallery.ShowPhotoSwipe('+index+')" src="'+
    thumbnail+'" width="100%"> <div class="info"> <h4>'+
    (title?title :"")+'</h4> <h5>'+
    (date?date:"")+'</h5>'+
    "<a href='javascript:void(0)'>"+placeName+"</a>"+
    $html_likes
    +' </div> </div>';
    return $html
};
Gallery.init = function(images)
{
    Gallery.lastPhotoIndex = 0;
    Gallery.images = images;
    log("startin init gallery",images);
    var $gallery = $(Gallery.target);
    $gallery.children().remove();

    var i = 0;
    for(;i<images.length && i<photoPerPage;i++){

        var image = images[i];
        log("cur image",image);
        $html = Gallery.GetHtml(image.thumbnail,image.title,image.date,image.placeName,i,images);
        $gallery.append($html);
    }
    Gallery.lastPhotoIndex = i;
    if( Gallery.lastPhotoIndex == Gallery.images.length){
        $button_show_more.hide();
    }

    var wall = new freewall(Gallery.target);
    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 200,
        cellH: 'auto',
        onResize: function() {
            wall.fitWidth();
        }
    });

    wall.container.find('.brick img').load(function() {
        wall.fitWidth();
    });
    Gallery.wall = wall;
};
Gallery.ShowMore = function()
{
    var i = Gallery.lastPhotoIndex;
    for(;i<Gallery.images.length && i<photoPerPage+Gallery.lastPhotoIndex;i++) {

        var image = Gallery.images[i];
        Gallery.wall.appendBlock(Gallery.GetHtml(image.thumbnail,image.title,image.date,image.placeName,i));

    }

    Gallery.lastPhotoIndex = i;


    if( Gallery.lastPhotoIndex == Gallery.images.length){
        $button_show_more.hide();
    }
    Gallery.wall.fitWidth();
};

Gallery.photoSwipe = {};
Gallery.ShowPhotoSwipe = function(index)
{
    var pswpElement = document.querySelectorAll('.pswp')[0];



    Gallery.photoSwipe = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, PHOTOS, {
        index : index,
        loop:false,
        history:true
    });

    Gallery.photoSwipe.listen('afterChange', function() {
        if(!Gallery.photoSwipe.currItem){
            return;
        }
        console.log(Gallery.photoSwipe.currItem);
        var linkVkButton  = $("#linkVkButton");
        var  linkInstaButton = $("#linkInstagram");


        if(!Gallery.photoSwipe.currItem.vkid || Gallery.photoSwipe.currItem.vkid<=0){
            linkVkButton.hide();
        }else{
            linkVkButton.show();
        }

        if(!Gallery.photoSwipe.currItem.photolinkInstagram){
            linkInstaButton.hide();
        }else{
            linkInstaButton.show();
        }

    });
    Gallery.photoSwipe.init();
}

