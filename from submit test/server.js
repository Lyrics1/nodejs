var http=require('http');//使用nodejs内置的http模块
var url=require('url');//使用内置的url模块`

start = (route,handle) =>{
    onRequest = (request,response) => {

    var postData ="";


    var pathname=url.parse(request.url).pathname;

    console.log('接收到'+pathname+'请求！');
    //设置接收数据格式
    request.setEncoding("utf8");
//注册data事件
    request.addListener("data",function(postDataChunk){
        postData += postDataChunk;
        console.log(`接收数据块${postDataChunk}`);

    });
    // //注册end事件

    request.addListener("end",function(){
         route(handle,pathname,response,postData);
    })
   

    // response.writeHead(200,{"Content-Type":"text/plain"});
    // response.write("Hello");
    // response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log('服务器已经启动！');
}
exports.start=start;