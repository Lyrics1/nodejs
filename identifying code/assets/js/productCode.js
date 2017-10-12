window.onload = function() {

    var osb = document.getElementById("submit");
    var rePro = document.getElementById("rePro");
    var img = document.getElementById("code");
    var content = document.getElementById("content");

    rePro.onclick = getImg;

    function getImg() {
        img.src = "http://localhost:8000/?t=" + Math.random();
    }

    osb.onclick = function() {
        //将输入的数据与后台session进行比对
        $.ajax({
            url: 'http://localhost:8000/check',
            type: 'GET',
            cache: false,
            dataType: 'jsonp',
            data: { 'data': content.value },
            jsonp: 'callback',
            jsonpCallback: 'handler',
            xhrFields: {
                withCredentials: true
            }, //设置发送cookie
            crossDomain: true,
            success: handler,
            error: function(jq, err, text) {
                alert(err.message);
            }
        });
    }

    function handler(obj) {
        if (obj.status) {
            alert("验证码输入成功");
            getImg();
        } else {
            alert("验证码输入错误");
        }
    }
}