var name = "zhanfan";

$('.submit').click(function(){
	alert("lll")
	$.ajax({
	url: 'http://localhost:3000/',
	type: 'POST',
	dataType :'JSON',
	data:{
		name :name
	},
	success:function(data){
			alert("fff")
	},
	error:function(err){
		console.log("err"+err);
	}


})
})



