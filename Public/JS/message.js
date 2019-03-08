$(document).ready(function(){

	getUserInfor();

	getMessage();
	//获取文章

	getArtHot();

	$("#addMsg").click(function(){
		addMsg();
	});

});

var msgList=[];
var artHotList=[];
//全局变量 文章列表对象
var pageEach=5;
var pageIndex=1;


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

function getArtHot(){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Art?method=ShowArtHot",
		dataType:"JSON",
		data:{usertel:"1"},
		success:function (data) {
			//console.log(data);
			artHotList=data.result;
			for(var i=0;i<artHotList.length;i++){
				var str=artHotList[i].content;
				var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<h4 class=\"media-heading\">"+"<a href=\"showArt.html?id="+
				    artHotList[i].artid+"\">"+artHotList[i].artitle+"</a></h4>"+   
				  "</div></div>";
				 $("#artHot").append(txt);
			}
			
		},
		error:function(){
			//alert("发生错误！");
		},
	});
}

function getMessage(){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Mes?method=ShowMes',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:"1",
			Page_each:pageEach,
			PageNumber:pageIndex
		},
		success:function (data) {
			
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#artList").empty();
			msgList=data.result[0].Data;
			for(var i=0;i<msgList.length;i++){
				var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<p>"+msgList[i].mcontent+"</p>"+
				    "<h4><small>"+
				   		"<span>时间：</span>"+
				    	"<span>"+msgList[i].mtime+"</span> "+	
				    "</small></h4>"+
				  "</div></div>";
				 $("#msgList").append(txt);
			}
			pageIndex=1;	
		},
		error:function(){
			//alert("发生错误！");
		},
	});
}

function setPage(index){
	pageIndex=index;
	getMessage();
}

function addMsg(){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Mes?method=AddMes',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:"1",
			mcontent:UM.getEditor('myEditor').getContent(),  
		},
		success:function(data){
			if(data.code=="0"){
				alert("留言成功！");
				window.location.reload();
			}
			else
				alert("留言失败！");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});
}
