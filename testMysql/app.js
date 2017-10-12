var express = require('express');

// var mongodb_connect = require('./mongodb_connect');
var  connectMysql = require('./ConnectMysql');

var checkStatus = require('./status');

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
		const name = req.body.name;
		var Data ={"name":name,"password":"zf"}
		connectMysql.MYSQL(Data,(end)=>{
			console.log(end);
			res.send(end);
		});		
		// mongodb_connect.insert(req.body.name,req,res);

});

app.post('/status',(req,res)=>{
	const name = req.body.name;
	console.log(name);
		checkStatus.SELECT(name,(status)=>{
			console.log("状态：",status[0].status);
		const t= 5;
			res.send(status);
		})
})

app.listen(3000,()=>{
	console.log(__dirname)
	console.log("port :3000")
})