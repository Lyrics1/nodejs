insert = (data,callback) =>{
	var  MongoClient = require('mongodb').MongoClient;

	var url = 'mongodb://localhost:27017/test';

	var assert = require('assert');
	
	var insertText = (db,callback) =>{

		//链接到表
		var collection = db.collection('test');
		
		collection.insertMany({"kk":"888"},(err,result)=>{
			assert.equal(null,err);
		
			callback(result);
		})

	}

	MongoClient.connect(url,(err,db)=>{
	    assert.equal(null,err);
	    console.log("Connection successfully to server");
	    insertText(db,()=>{
	    	 db.close();
	    })
	   
	});
}


module.exports.insert = insert;