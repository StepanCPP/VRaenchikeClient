/**
 * Created by Alexeev on 07-May-15.
 */
function handle_error(errcode,errtext){
    alert(errtext);
}
function isSuccess(data){
    if(data.code!=0){
        handle_error(data.code,data.message);
        return false;
    }
    return true;
}
function log(title,text){
    console.log("~");
    console.log(title);
    console.log(text);
    console.log("~");
}