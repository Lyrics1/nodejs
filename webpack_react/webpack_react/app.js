var express = require('express');

var path = require('path');

var http = require('http');

var app = express();

app.use(express.static(path.join(__dirname,'view')))


app.listen(3000);

console.log("服务已经启动");

