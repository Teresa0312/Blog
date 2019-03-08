$(document).ready(function(){

	(function($){
		$.getData=function(name){
			var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
			var result = window.location.search.substr(1).match(reg);
			if (result!= null) return result[2]; return null;		
		}
	})(jQuery);

	getUserInfor();

	var id=$.getData('id');

	getPicture(id);

	getMessage();

});


function getUserInfor(){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/User?method=ShowInfo",
		dataType:"JSON",
		data:{usertel:"1"},
		success:function (data) {
			//console.log(data);
			var array=data.result;
			$("#userName").text(array[0].uname);
			$("#name_bottom").text(array[0].uname);
			$("#signature").text(array[0].signature);
			$("#profile").attr("src",array[0].picture);
			var w =$("#profile").width();
			$("#profile").height(w);
		},
		error:function(){
			//alert("发生错误！");
		},
	});
}

function getPicture(id){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Pic?method=ShowPic",
		dataType:"JSON",
		data:{
			picid:id
		},
		success:function (data) {
			var array=data.result[0];
			$("#title").text(array.pictitle);
			$("#showThis").attr("src",array.picpath);
		},
		error:function(){
			//alert("发生错误！");
		},
	});
}


function getMessage(){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Mes?method=ShowMes",
		dataType:"JSON",
		data:{
			usertel:1,
			Page_each:1,
			PageNumber:1
		},
		success:function (data) {
			console.log(data);
			$("#msgContent").text(data.result[0].Data[0].mcontent);
			$("#msgTime").text(data.result[0].Data[0].mtime);
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

