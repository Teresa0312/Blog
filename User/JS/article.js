$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));

	showArticle();
	//显示文章列表

	
});

var artList=[];
//全局变量 文章列表对象
var pageEach=10;
var pageIndex=1;

//显示文章表格
function showArticle(){
	var user=$.cookie("tel");
	//获得cookie中的手机号
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=ShowArt',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			Page_each:pageEach,
			PageNumber:pageIndex
		},
		success:function(data){
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#articleList").empty();
			$("#articleList").append("<tr><th>文章标题</th>"+
			   	"<th>类型</th><th>发表时间</th>"+
			   	"<th>阅读量</th><th>评论量</th><th>操作</th></tr>");
			artList=data.result[0].Data;
			for(i=0;i<data.result[0].Data.length;i++){
				//添加元素
				var txt="<tr>"+
					   	"<td><a href=\"../Public/showArt.html?id="+artList[i].artid+"\">"+artList[i].artitle+"</a></td>"+
					   	"<td>"+artList[i].typename+"</td>"+
					   	"<td>"+artList[i].uptime+"</td>"+
					   	"<td>"+artList[i].times+"</td>"+
					   	"<td>"+artList[i].comsum+"</td>"+
					   	"<td>"+
					   		"<button class=\"btn btn-success\" id=\"commentManage\">评论管理</button> "+
					   		"<button class=\"btn btn-info\" id=\"editArt\">修改</button> "+
					   		"<button class=\"btn btn-danger\" id=\"deletArt\">删除</button>"+
					   	"</td>"+"</tr>";
				$("#articleList").append(txt);
				//添加到文章表格中
			}
			btnEvent();
			//按钮绑定事件
			pageIndex=1;
		},
		error:function(){
			alert("发生错误！");
		},
	});
	
}

function setPage(index){
	pageIndex=index;
	showArticle();
}

//按钮绑定事件
function btnEvent(){
	var btnList=$("button");
	//获得所有按钮

	btnList.filter("#commentManage").on('click',function(event){
		showComment(event);
	});
	//管理评论按钮

	btnList.filter("#editArt").on('click',function(event){
		editArticle(event);
	});
	//编辑文章按钮

	btnList.filter("#deletArt").on('click',function(event){
		deletArticle(event);
	});
	//删除文章按钮
}

//显示管理评论
function showComment(event){
	var tr=$(event.target).parents("tr");
	//得到父元素tr
	var trIndex=tr.index();
	//得到tr的索引
	window.location.href='Comment.html?id='+artList[trIndex-1].artid;
	//将文章id传到Comment.html
}

//编辑文章
function editArticle(event){
	var tr=$(event.target).parents("tr");
	//得到父元素tr
	var trIndex=tr.index();
	//得到tr的索引
	//window.location.href='EditArticle.html?data='+artList[trIndex-1]['article'];
	window.location.href='EditArticle.html?id='+artList[trIndex-1].artid;
	//将文章标题传到EditArticle.html
} 

//删除文章
function deletArticle(event){
	var user=$.cookie("tel");
	var tr=$(event.target).parents("tr");
	//得到父元素tr
	var trIndex=tr.index();
	//得到tr的索引
	var articleID=artList[trIndex-1].artid;
	//得到文章id
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=DelArt',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			artid:articleID
		},
		success:function(data){
			if(data.code==0){
				alert("删除文章成功！");
				window.location.reload();
				//刷新页面
			}			
			else
				alert("删除文章失败！");
		},
		error:function(){
			alert("发生错误！");
		},
	});
}
