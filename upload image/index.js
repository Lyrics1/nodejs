var server=require("./server");//使用server模块
var router=require("./route");
var requestHandlers = require('./requestHandlers');

//建立一个处理请求的集合handle

var handle ={};

//将不同的URL  映射到相同的处理请求上，只需添加一个键为“/”的属性
//配置/ 和/start 的请求 交给requestHandlers.starts 处理

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;




//调用server下的公共方法
server.start(router.route,handle)