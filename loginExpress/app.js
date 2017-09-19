var express = require('express'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//加载路由控制

var routes = require('./routes/index');

//创建项目实例
var app = express();

//定义ejs模板引擎和模板文件位置，也可以使用其他模板引擎 jade
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//定义icon图标设置 /public/favicon.ico 为 favicon 图标。
// app.use(favicon(__dirname + '/public/favicon.ico'));
//定义日志和输出级别
app.use(logger('dev'));//在定义静态文件之前会记录日志，之后不会
//定义数据解析器
app.use(bodyParser.json());//加载解析 json 的中间件。
app.use(bodyParser.urlencoded({extended:false}));//加载解析 urlencoded 请求体的中间件。
//定义cookie 解析器i
app.use(cookieParser());//加载解析 cookie 的中间件
//定义静态文件目录
app.use(express.static(path.join(__dirname,'public')));


//匹配路径和路由
app.use('/',routes);

//404错误处理
app.use(function(req,res,next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境，500错误处理
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports=app;













