


$('.submit').click(function(){
	// alert("lll")
	var name = $("#name").val();
	var pass = $("#pass").val();
	console.log(name,pass);
	// name = "KJJ"
	$.ajax({
	url: 'http://localhost:3000/',
	type: 'POST',
	dataType :'JSON',
	data:{
		name :name
	},
	success:function(data){
			alert("fff");
			console.log(data)
	},
	error:function(err){
		// console.log("err"+err);
	}


})
})

$('#check-status').click(()=>{
	var nam="张帆";
	var num= ;学号
	$.ajax({
		url:'http://localhost:3000/status',
		type:'POST',
		dataType:'JSON',
		data:{
			name:nam
		},
		success(data){

			console.log("status",data);
			//显示状态条
			//进行页面渲染
		},
		error(){
			console.log("error");
			//提示错误信息

		}
	})

})



