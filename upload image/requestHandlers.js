var exec = require('child_process').exec;

var querystring = require('querystring');

var fs = require('fs');

var formidable = require('formidable');

var path = require('path');

//调用child_process模块的exec方法,功能从Node.js来执行一个shell命令
start = (response)=>{
	console.log("处理start请求已经唤醒");
		var body='<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html:'+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload" multiple="multiple">'+
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

upload = (response,request) =>{
	response.setHeader('Content-Type','text/javascript;charset=UTF-8');
    console.log("处理'upload'请求已被唤醒！");

    var form = new formidable.IncomingForm();

    form.uploadDir = `${__dirname}/tmp`;//指定上传文件路径，默认是系统缓存路径

    form.keepExtensions = true;//保留上传文件的格式名称
    form.parse(request,(error,fields,files)=>{
        console.log("解析完毕");
        if(error) throw new Error(error);
 
        fs.rename(files.upload.path, form.uploadDir, (err)=>{
             if(error) throw new Error(error);
             console.log("文件重命名成功");

        })
        var  imgURL = path.basename(`${files.upload.path}`);//获取路径最后的/后面的字符串
       
        show(response,imgURL);

        // response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        // response.write("接收到图像");
        // response.write("<img src='/show'>");
        // response.end();
    })
}
//显示文件处理程序
show = (response,imgURL) =>{
    console.log('处理show请求已经唤醒');

    fs.readFile(`./tmp/${imgURL}`,"binary",(error,file)=>{
        if(error){
            response.writeHead(500,"Content-Type:text/plain;charset=utf-8");
            response.write(error +"\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"image/jpg;image/jepg"});
            response.write(file,"binary");
            response.end();
        }
    });

}
exports.start = start;
exports.upload = upload;
exports.show = show;
