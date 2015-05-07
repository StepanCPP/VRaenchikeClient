/**
 * Created by Alexeev on 05-May-15.
 */
var serverIp = "http://localhost:8080/api/";
var methods = {
    banned:{
        ban : {
            vk:serverIp+"banned/ban/vk",
            instagram:serverIp+"banned/ban/instagram"
        },
        disban:serverIp+"banned/disban",
        all:serverIp+"banned/all"
    },
    place:{
        add:serverIp+"place/add",
        remove:serverIp+"place/remove",
        all:serverIp+"place/all",
        update:serverIp+"place/update"
    },
    photo:{
         like:serverIp+"photo/like",
         dislike:serverIp+"photo/dislike",
         favorite:{
            add:serverIp+"photo/favorite/add",
            remove:serverIp+"photo/favorite/remove",
            all:serverIp+"photo/favorite/all"
        }
    }
};

var BannedController = {};
var PhotoController = {};
var PlaceController = {};

BannedController.ban={};
BannedController.ban.vk=function(link,callback){
    var data = {};
    data.link = link;
    $.get(methods.banned.ban.vk,data,callback);
};
BannedController.ban.instagram=function(link,callback){
    var data = {};
    data.link = link;
    $.get(methods.banned.ban.instagram,data,callback);
};

BannedController.disban=function(idbanned,callback){
    var data = {};
    data.idbanned = idbanned;
    $.get(methods.banned.disban,data,callback);
};
BannedController.all=function(callback){
    var data = {};
    $.get(methods.banned.all,data,callback);
};

PhotoController.like=function(url,callback){
    var data = {};
    data.url  =url;
    $.get(methods.photo.like,data,callback);
};
PhotoController.dislike=function(url,callback){
    var data = {};
    data.url  =url;
    $.get(methods.photo.dislike,data,callback);
};
PhotoController.favorite = {};

PhotoController.favorite.add=function(url,callback){
    var data = {};
    data.url  =url;
    $.get(methods.photo.favorite.add,data,callback);
};
PhotoController.favorite.remove=function(url,callback){
    var data = {};
    data.url  =url;
    $.get(methods.photo.favorite.remove,data,callback);
};
PhotoController.favorite.all=function(count,offset,callback){

    var data = {};
    data.count = count;
    data.offset = offset;
    $.get(methods.photo.favorite.all,data,callback);
};

PlaceController.add= function(lng,lat,radius,name,callback){
    var data = {};
    data.lng=lng;
    data.lat = lat;
    data.radius=radius;
    data.name = name;
    $.get(methods.place.add,data,callback);
};
PlaceController.update= function(id,lng,lat,radius,name,callback){
    var data = {};
    data.id  = id;
    data.lng=lng;
    data.lat = lat;
    data.radius=radius;
    data.name = name;
    $.get(methods.place.update,data,callback);
};
PlaceController.all= function(callback){
    var data = {};
    console.log(methods.place.all);
    $.get(methods.place.all,data,callback);

};
PlaceController.remove=function(id,callback){
    var data = {};
    data.id = id;
    $.get(methods.place.all,data,callback);
};