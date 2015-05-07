/**
 * Created by Alexeev on 05-May-15.
 */
Gallery = {};
Gallery.target = "#freewall";
Gallery.init = function(images)
{
    log("startin init gallery");
    var $gallery = $(Gallery.target);
    $gallery.children().remove();
    for(var i=0;i<images.length;i++){

        var image = images[i];
        log("cur image",image);
        $html = '<div class="brick"><img src="'+
        image.thumbnail+'" width="100%"> <div class="info"> <h3>'+
        (image.title?image.title :"")+'</h3> <h5>'+
        image.date+'</h5> </div> </div>';
        $gallery.append($html);
    }

    var wall = new freewall("#freewall");
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
};
