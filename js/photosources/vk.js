/**
 * Created by Alexeev on 22-Mar-15.
 */


function getAllsizes(photo,prefix)
{
    var allSizes = [];
    for (var k in photo){
        if (photo.hasOwnProperty(k)) {
            if(k.indexOf(prefix)!=-1){
                allSizes.push({'size':k.split('_')[1],
                    'url':photo[k]});
            }
        }
    }
    if(allSizes.length>1)
        allSizes[allSizes.length-1]['size'] =photo.width;
    return allSizes;
}
function parsePhoto(photo,photo_size_prefix){
    var allSizes = getAllsizes(photo,photo_size_prefix);
    var data = {
        src:allSizes[allSizes.length-1]['url'],
        thumbnail:allSizes[2]['url']?allSizes[2]['url'] : allSizes[1]['url'] ,
        thumbnail_w:150,
        w:photo.width,
        h:photo.height,
        vkid:photo.owner_id,
        title : photo['text'],
        lat:photo['lat'],
        long:photo['long'],
        date:moment.unix(parseInt(photo['date'])).format('MMMM Do YYYY, h:mm:ss a')+"<br>"+moment.unix(parseInt(photo['date'])).fromNow(),
        timestamp:parseInt(photo['date']),
        idApi:photo.owner_id+"_"+photo.id,
        type:PhotoServices.Vkontakte
    };
    return data;
}
function getPhotosVK(lat,lng,count,radius,callbackfunc){
    var imageSizes = ['src','src_big','src_small','src_xbig','src_xxbig','src_xxxbig'];
    var data = {"sort":0,
        'lat':lat,
        'long':lng,
        'count':count,
        'radius':radius
        ,'v':'5.29'};
    log("create request vk",data);
    $.ajax({
        type: "GET",
        url:'https://api.vk.com/method/photos.search',
        dataType: 'jsonp',
        data:data,
        success:function(data){
           // Application.saveOptions();

            log("vk_request",data);

            data = data.response.items;

            //for(var i=data.length-1;i>=data.length-parseInt($('#count').val()) && i>=0;i--){
            var imagesArrayOut=[];
             for(var i=0;i<data.length;i++){



                imagesArrayOut.push(parsePhoto(data[i],"photo"));




            }
            callbackfunc(imagesArrayOut);
        }

    });
}
function getInfoAboutPhotos(photos,callback)
{
    log("photos to send",photos);
    var imsizes = ['s','m','x','o','p','q','y','z','w'];
    var photos_string = "";
    for(var i=0;i<photos.length;i++)
    {
        photos_string+=photos[i].idApi+",";
    }
    log("photo string",photos_string);
    var data = {photos:photos_string,
        extended:0,
        photo_sizes:0,
        v:'5.31'};
    $.ajax({
        type: "POST",
        url:'https://api.vk.com/method/photos.getById',
        dataType: 'jsonp',
        data:data,
            success:function(data)
            {
                data = data.response;
                var imagesArray = [];
                if(!data){
                    callback(imagesArray);
                    return;
                }

                for(var i=0;i<data.length;i++){
                    imagesArray.push(parsePhoto(data[i],"photo"));
                }
                callback(imagesArray);
            }
        });

}
