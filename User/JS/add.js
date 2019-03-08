$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));
	showType();
	//获得文章类型

	$("#add").click(function(){
		addArticle();
	});
	//添加文章
});

//显示文章类型
function showType(){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Type?method=ShowType',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{},
		//data为null
		success:function(data){
			if(data.code=="0"){
				var array=data.result;
				for(i=0;i<array.length;i++){
					var txt="<option value=\""+array[i].typeid+"\">"+
					array[i].typename+"</option>";
					$("#type").append(txt);
					//将option元素添加到select里
				}	
			}
			else
				alert("获取类型失败！");
		},
		error:function(){
			 alert("发生错误！")
			 //在console输出错误
		},
	});
}

//添加文章
function addArticle(){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=AddArt',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:$.cookie('tel'),
			artitle:$("#title").val(),
			content:UM.getEditor('myEditor').getContent(),  
			typeid:$("#type").val(),
			author:$("#author").val()
		},
		success:function(data){
			if(data.code=="0"){
				alert("发表文章成功！");
				window.location.href="../User/Article.html";
			}
			else
				alert("发表文章失败！");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});
}