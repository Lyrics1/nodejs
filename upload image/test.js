



   
var http = require('http');

http.createServer(function(request,response){
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

        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(body);
        response.end();

}).listen(8888);


