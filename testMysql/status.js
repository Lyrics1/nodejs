SELECT=(data,callback)=>{
	const mysql = require('mysql');
	const config = require('./conMysql.config.js');
	const connection = mysql.createConnection(config);

	connection.connect((err)=>{
		if(err){
			return console.error('error'+err.message);
		}
		console.log("connection success");
	});

	const sql = `select status from student where name="${data}"`;

	connection.query(sql,(error,results,filed)=>{
		if(error){
			console.log(error);
			callback(0);//在数据库中不存在

		}
		callback(results);//返回查询得到状态码

	});

	connection.end();
}

module.exports.SELECT =SELECT;