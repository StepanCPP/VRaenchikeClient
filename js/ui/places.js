/**
 * Created by Alexeev on 08-May-15.
 */
var item_list_unselected_class = "btn-material-teal-200",
    item_list_selected_class =" btn-material-teal-400";
var $place_name = $("#place-name");

var max_radius_input = 1000;

function placeItemClicked(index){
    var $place_items = $(".places-list-item");
    $place_items
        .removeClass(item_list_selected_class)
        .removeClass(item_list_unselected_class)
        .addClass(item_list_unselected_class);


    $("#place-list-item-"+index).addClass(item_list_selected_class);
    log("place clicked",PLACES[index]);
    PlaceController.selectPlace(index);
    PlaceController.showInfo(index);
   // initializeMap(50,50,250);
}