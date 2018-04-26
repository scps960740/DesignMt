$(document).ready(function () {

    var url = location.href;
    
    //取得問號之後的值
    var temp = url.split("?");

    //將值再度分開
    var vars = temp[1].split("&");

    //一一顯示出來
    for (var i = 0; i < vars.length; i++) {
     alert(vars[i]);
    };

});