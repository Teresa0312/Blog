$(document).ready(function(){

	getUserInfor();

	getVideo();
	//获取文章

	getArtHot();

	getMessage();
});

var vidList=[];
//全局变量 文章列表对象
var pageEach=10;
var pageIndex=1;
var artHotList=[];

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
			alert("发生错误！");
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

function getVideo(){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Vid?method=VidList',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:1,
			Page_each:pageEach,
			PageNumber:pageIndex
		},
		success:function (data) {
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#vidList").empty();
			vidList=data.result[0].Data;
			for(var i=0;i<vidList.length;i++){
				var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<h4 class=\"media-heading\">"+"<a href=\""+
				   vidList[i].vpath+"\">"+vidList[i].vtitle+"</a></h4>"+   
				    "<h4><small>"+
				    	"<span>时间：</span>"+
				    	"<span>"+vidList[i].vtime+"</span> "+		
				    "</small></h4>"+
				  "</div></div>";
				 $("#vidList").append(txt);
			}
			pageIndex=1;	
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function setPage(index){
	pageIndex=index;
	getVideo();
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
			$("#msgContent").text(data.result[0].Data[0].mcontent);
			$("#msgTime").text(data.result[0].Data[0].mtime);
		},
		error:function(){
			alert("发生错误！");
		},
	});
}
