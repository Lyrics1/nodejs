var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");


var bmp = require("./bmp.js"); //生成验证码

var app = express();
var code;
//对数据进行格式化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//设置session
app.use(cookieParser());
app.use(session({
    secret: '123',
    cookie: {
        maxAge: 60000 * 60,
        secure: false,
    }, //设置有效时间是1小时
    resave: false,
    saveUninitialized: false
}));

app.get('/', function(req, res) {
    bmp(req, res); //生成验证码，发送到前端并存储进session
    res.end();
});

app.get('/check', function(req, res){

    var data = req.query.data;
    console.log(req);
    console.log("接收到来自客户端的验证码验证请求");
    if(req.session.code){
        if (data.toLowerCase() == req.session.code.toLowerCase()) {
            var obj = { 'status': true };
            console.log("验证通过");
            delete req.session.code;
            //bmp(req, res);
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.end(req.query.callback + '(' + JSON.stringify(obj) + ')');
        }else{
            var obj = { 'status': false };
            console.log("验证失败");
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.end(req.query.callback + '(' + JSON.stringify(obj) + ')');
        }
        
    }
});
app.listen(8000);