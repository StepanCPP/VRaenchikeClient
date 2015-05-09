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
        info:serverIp+"photo/info",
         favorite:{
            add:serverIp+"photo/favorite/add",
            remove:serverIp+"photo/favorite/remove",
            all:serverIp+"photo/favorite/all"
        }
    }
};

var BannedRequester = {};
var PhotoRequester = {};
var PlaceRequester = {};

BannedRequester.ban={};
BannedRequester.ban.vk=function(link,callback){
    var data = {};
    data.link = link;
    $.get(methods.banned.ban.vk,data,callback);
};
BannedRequester.ban.instagram=function(link,callback){
    var data = {};
    data.link = link;
    $.get(methods.banned.ban.instagram,data,callback);
};

BannedRequester.disban=function(idbanned,callback){
    var data = {};
    data.idbanned = idbanned;
    $.get(methods.banned.disban,data,callback);
};
BannedRequester.all=function(callback){
    var data = {};
    $.get(methods.banned.all,data,callback);
};

PhotoRequester.like=function(url,idApi,PhotoService,callback){
    var data = {};
    data.url  =url;
    data.ApiType = PhotoService;
    data.idApi = idApi;
    $.get(methods.photo.like,data,callback);
};
PhotoRequester.dislike=function(url,idApi,PhotoService,callback){
    var data = {};
    data.url  =url;
    data.ApiType = PhotoService;
    data.idApi = idApi;
    $.get(methods.photo.dislike,data,callback);
};
PhotoRequester.info = function(images,callback)
{
    var data = {};
    data.photos = JSON.stringify(images);
    $.post(methods.photo.info,data,callback);
};
PhotoRequester.favorite = {};

PhotoRequester.favorite.add=function(url,idApi,PhotoService,callback){
    var data = {};
    data.url  =url;
    data.ApiType = PhotoService;
    data.idApi = idApi;
    $.get(methods.photo.favorite.add,data,callback);
};
PhotoRequester.favorite.remove=function(id,callback){
    var data = {};
    data.id  =id;
    $.get(methods.photo.favorite.remove,data,callback);
};
PhotoRequester.favorite.all=function(count,offset,callback){

    var data = {};
    data.count = count;
    data.offset = offset;
    $.get(methods.photo.favorite.all,data,callback);
};

PlaceRequester.add= function(lng,lat,radius,name,callback){
    var data = {};
    data.lng=lng;
    data.lat = lat;
    data.radius=radius;
    data.name = name;
    $.get(methods.place.add,data,callback);
};
PlaceRequester.update= function(id,lng,lat,radius,name,callback){
    var data = {};
    data.id  = id;
    data.lng=lng;
    data.lat = lat;
    data.radius=parseInt(radius);
    data.name = name;
    log("update place",data);
    $.get(methods.place.update,data,callback);
};
PlaceRequester.all= function(callback){
    var data = {};
    console.log(methods.place.all);
    $.get(methods.place.all,data,callback)
        .fail(function(){
        handle_error("25","can't connect to server");
            closeLoading();
        });

};
PlaceRequester.remove=function(id,callback){
    var data = {};
    data.id = id;
    $.get(methods.place.remove,data,callback);
};