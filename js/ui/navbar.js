/**
 * Created by Alexeev on 07-May-15.
 */
var $navbar = $(".nav-main-menu");
$navbar.on('click',function(){
    $navbar.removeClass('active');
    $(this).addClass('active');
});
