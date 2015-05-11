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
var brickClasses = {};
function filterPlace(place){
    /*for(var prop in brickClasses){
        if(place!=prop)
            $(".brick-"+prop).fadeOut();
    }*/
    //$('.brick-'+place).fadeIn();
   // Gallery.wall.filter('.brick-'+place);


    PHOTOS_ALL = [];

    PHOTOS_ALL = PHOTOS_ALL.concat(PHOTOS);
    PHOTOS = [];
    for(var i=0;i<PHOTOS_ALL.length;i++){
        if(PHOTOS_ALL[i].placeName==place)
            PHOTOS.push(PHOTOS_ALL[i]);
    }
    Gallery.init(PHOTOS);
    $('.allPlaces').show();
    $("html, body").animate({ scrollTop: 0 }, "slow");


}
var PHOTOS_ALL = [];
function showAllPlaces()
{
    $('.allPlaces').hide();
    PHOTOS = [];
    PHOTOS = PHOTOS.concat(PHOTOS_ALL);
    PHOTOS_ALL = [];
    Gallery.init(PHOTOS);

   // Gallery.wall.unFilter();
}

var cssa = 0;
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

    if(title)
        $html_title = '<div class="title section"> <h4 class="content">'+(title?title :"")+'</h4></div>';
        else{
        $html_title = '';
    }
    $html = '<div class="brick brick-'+placeName+'">' +
    '<img  onclick="Gallery.ShowPhotoSwipe('+index+')" src="'+
    thumbnail+'" width="100%"> <div class="info"><div class="date section"> <h5 class="content">'+
    (date?date:"")+'</h5></div>'+
    "<a class='placeName' onclick='filterPlace(\""+placeName+"\")' href='javascript:void(0)'>"+placeName+"</a>&nbsp;&nbsp;<a class='allPlaces' onclick='showAllPlaces()' href='javascript:void(0)'>All</a>"+
    $html_likes
    +' </div> </div>';
    return $html
};
Gallery.init = function(images)
{
    brickClasses = {};
    Gallery.lastPhotoIndex = 0;
    Gallery.images = images;
    log("startin init gallery",images);
    var $gallery = $(Gallery.target);
    $gallery.children().remove();

    var i = 0;
    for(;i<images.length && i<photoPerPage;i++){

        var image = images[i];
        log("cur image",image);
        $html = Gallery.GetHtml(image.thumbnail,image.title,image.date
            ,image.placeName,i,images);
        $gallery.append($html);
    }

    Gallery.lastPhotoIndex = i;
    if( Gallery.lastPhotoIndex == Gallery.images.length){
        $button_show_more.hide();
    }

    var wall = new freewall(Gallery.target);
   // wall.filter('.page0');
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
    if(PHOTOS_ALL.length>0){
        $('.allPlaces').show();
    }

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

