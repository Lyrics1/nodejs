var express = require('express');

var mongodb_connect = require('./mongodb_connect');

var path = require('path');

// express不能直接处理post数据，需要引入中间件来处理。

// app.use(require('body-parser')())//失效
var bodyParser = require('body-parser');

var app = express();


app.use(express.static(path.join(__dirname,'view')))
app.use(bodyParser.urlencoded({extended :false}));

app.use(bodyParser.json());



app.post('/',(req,res)=>{

		console.log(req.body.name);
		mongodb_connect.insert(req.body.name,req,res);

});

app.listen(3000,()=>{
	console.log(__dirname)
	console.log("port :3000")
})