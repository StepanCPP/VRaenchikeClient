/**
 * Created by Alexeev on 08-May-15.
 */
PlaceController = {};
PlaceController.selectPlace=function(index)
{
    $("#place-list-item-"+index).addClass(item_list_selected_class);
     if(index==undefined  || PLACES.length<=index){
         log("place clicked out of array",index);
         return;
     }
    var cur_place =PLACES[index];
   // $("#place-list-item-"+index).
    placeMarker(new google.maps.LatLng(cur_place.lat
        ,cur_place.lng),cur_place.radius);
};
PlaceController.showInfo = function(index){
    if(index==undefined  || PLACES.length<=index){
        log("place clicked out of array",index);
        return;
    }


    var cur_place =PLACES[index];
    $place_name.val(cur_place.placeName);


    $place_radius.val(cur_place.radius);
};
PlaceController.updatePlace = function()
{
    if(CURRENTPLACE!=null){

        showLoading();
        PlaceRequester.update(CURRENTPLACE.idPlace,
            marker.getPosition().lng(),
            marker.getPosition().lat(),
            $place_radius.val(),
            $place_name.val(),
            function(data){
                closeLoading();
                PlaceCallback.update(data);
                PlaceController.ShowPlaces();
                PlaceController.selectPlace(CURRENTPLACEINDEX);
            });
    }
};


PlaceController.ShowPlaces = function(places)
{
    if(!places){
        places = PLACES;
    }

    $place_items.children().remove();
    for(var i=0;i<places.length;i++){
        var text="",title=places[i].placeName;
       /* var html='<div class="row"> <div class="col-sm-3"> <div class="list-group-item hvr-shadow" style="cursor: pointer;" id="place-list-item-'+i+'"><div class="row-content"><h4 class="list-group-item-heading">'+
            title+'</h4><p class="list-group-item-text">'+
            text+'</p></div></div> </div> </div>';
        */
        var html = '<button class="btn btn-material-teal-200 places-list-item" onclick="placeItemClicked('+i+')" id="place-list-item-'+i+'">'+title+'</button>';
        $place_items.append(html);
    }

}