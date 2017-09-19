route = (handle,pathname,response,request) =>{
    console.log(`路由接收来自url:${pathname}的请求`);
    //检查给定的路径对应的请求处理程序是否存在  
    if(typeof handle[pathname]==='function'){
    //存在，直接调用相应的函数
        handle[pathname](response,request);//从传递对象中获取请求处理函数，参照index.js
    }else{
         console.log('对于'+pathname+'没有找到相应的处理程序！');
        //处理response操作
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("页面从地球上消失了~");
        response.end();
    }
}
exports.route=route;