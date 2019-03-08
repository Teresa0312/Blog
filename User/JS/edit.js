$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));
	(function($){
		$.getTitle=function(name){
			var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
			//(^|&) 匹配以&开头或前面没有字符的内容
			//[^&+] 包含&（^在这里开头代表不包含的意思） 匹配最少一个次，最多人一次并放到分组中
			//(&|$) 匹配&或者$放到分组中，其中分组出现次数最少零次，最多一次
			var result = window.location.search.substr(1).match(reg);
			//找到url中匹配的字符串
			if (result!= null) return result[2]; return null;
			//返回结果
		}
	})(jQuery);
	//匿名函数

	var id=$.getTitle('id');
	//得到文章标题

	showType();
	//获取文章类型

	showArticle(id);
	//获取文章内容

	$("#edit").click(function(){
		editArticle(id);
	});
	//修改文章
});

//获取文章类型
function showType(){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Type?method=ShowType',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{},
		//data为空
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
			 alert("发生错误！");
			 //在console输出错误
		},

	});
}


//显示文章内容
function showArticle(id){
	var user=$.cookie('tel');
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=This_Art',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			artid:id
		},
		success:function(data){
			if(data.code==0){
				$("#title").val(data.result[0].artitle);
				$(data.result[0].typename).attr("selected","selected");
				$("#author").val(data.result[0].author);
				UM.getEditor('myEditor').setContent(data.result[0].content);
			}
			else
				alert("显示失败");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});
}

//修改文章
function editArticle(id){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=AlterArt',
		//请求url
		dataType:"json",
		//后台返回数据类型
		data:{
			usertel:$.cookie('tel'),
			artid:id,
			artitle:$("#title").val(),
			content:UM.getEditor('myEditor').getContent(),
			typeid:$("#type").val(),
			author:$("#author").val()
		},
		success:function(data){
			if(data.code=="0"){
				alert("修改文章成功！");
				window.location.href="../User/Article.html";
			}
			else
				alert("修改失败！");
		},
		error:function(){
			 alert("发生错误！");
		},
	});
}