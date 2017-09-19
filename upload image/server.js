


//server
var http=require('http');//使用nodejs内置的http模块
var url=require('url');//使用内置的url模块`

start = (route,handle) =>{
    onRequest = (request,response) => {




    var pathname=url.parse(request.url).pathname;

    console.log('接收到'+pathname+'请求！');
   
     route(handle,pathname,response,request);


    }
    http.createServer(onRequest).listen(8888);
    console.log('服务器已经启动！');
}
exports.start=start;