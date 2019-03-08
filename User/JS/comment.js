$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));

	var id=$.getData('id');
	//得到文章标题


	getComment(id);
	//获取评论	

	
});


(function($){
	$.getData=function(name){
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

var comments=[];
//全局变量 评论列表
var pageEach=8;
var pageIndex=1;

//按钮绑定事件
function btnEvent(){
	var btnList=$("button");
	//获得所有按钮

	btnList.filter("#deletComment").on('click',function (event){
		deletCom(event);
	});
	//绑定事件
}

//获取评论
function getComment(id){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Com?method=ShowCom',
		//请求url
		dataType:"JSON",
		//后台返回数据类型
		data:{
			artid:id,
			Each:pageEach,
			PageNumber:pageIndex
		},
		success:function(data){
			console.log(data);
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+","+id+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#commentList").empty();
			$("#commentList").append("<tr><th class=\"comment\">评论</th><th>发表时间</th><th>操作</th></tr>");
			comments=data.result[0].Data;
			for(i=0;i<data.result[0].Data.length;i++){
				//添加元素
				var txt="<tr>"+				   
					   	"<td>"+comments[i].comcontent+"</td>"+
					   	"<td>"+comments[i].comtime+"</td>"+
					   	"<td>"+
					   		"<button class=\"btn btn-danger\" id=\"deletComment\">删除</button>"+
					   	"</td>"+"</tr>";
				$("#commentList").append(txt);
				//添加到评论表格中
			}
			btnEvent();
			//按钮绑定事件
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function setPage(index,id){
	pageIndex=index;
	getComment(id);
}


//删除评论
function deletCom(event){
	var tr=$(event.target).parents("tr");
	//获得按下按钮的父元素tr
	var trIndex=tr.index();
	//得到tr的索引
	var commentId=comments[trIndex-1].comid;
	//得到对应的评论id
	var artId=$.getData('id');
	//得到文章id
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Com?method=DelCom',
		//请求url
		dataType:"JSON",
		//后台返回数据类型 
		data:{
			comid:commentId
		},
		success:function(data){
			if(data.code=="0"){
				alert("删除评论成功！");
				window.location.reload();
			}
			else
				alert("删除评论失败！");
		},
		error:function(){
			alert("发生错误！");
		},

	});

}