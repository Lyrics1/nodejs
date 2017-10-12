MYSQL = (Data,callback)=>{
const mysql = require('mysql');
const config = require('./conMysql.config.js');
const connection = mysql.createConnection(config);

connection.connect((err)=>{
	if(err){
		return console.error('error'+err.message);
	}
	console.log("connection success");
});

//正则验证



const sql = `INSERT INTO student(name,tel) VALUES(?,?)`;

const data = [`${Data.name}`,`${Data.password}`];
console.log("data",data);

connection.query(sql,data,(err,results,fields)=>{
	if(err){
		 return  console.error("error"+err.message);
	}
	//可以得到插入行的id
		callback(0)
	  console.log('Todo Id:' + results.insertId);
	  // return results.insertId;
});

 connection.end((err)=>{
 	if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
 });//关闭数据库

}


module.exports.MYSQL = MYSQL;