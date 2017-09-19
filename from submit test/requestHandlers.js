var exec = require('child_process').exec;

var querystring = require('querystring');



//调用child_process模块的exec方法,功能从Node.js来执行一个shell命令
start = (response)=>{
	console.log("处理start请求已经唤醒");
		var body='<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html:'+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="提交" />'+
        '</form>'+
        '</body>'+
        '</html>';

        response.writeHead(200,{"Content-Type":"text/html;charset = utf-8"});
        response.write(body);
        response.end();


	 /* exec使node.js执行ls -lah
	 命令，
          为了实现非阻塞，使用回调函数*/
	// exec("ls -lah",function(error,stdout,stderr){
 //        response.writeHead(200,{"Content-Type":"text/plain;charset=utf-8"});
 //        response.write(stdout);
 //        response.end();
 //    });
}

upload = (response,postData) =>{
    response.setHeader('Content-Type','text/javascript;charset=UTF-8');
    console.log("处理'upload'请求已被唤醒！");
    response.writeHead(200,{"Content-Type":"text/html;charset = utf-8"});
    response.write('<head><meta charset="utf-8" /></head>');
    //使用querystring模块的parse方法获取POST数据中得text字段
    response.write("提交的文本："+querystring.parse(postData).text);
    response.end();
}

exports.start = start;
exports.upload= upload;
