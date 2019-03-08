$(document).ready(function(){

	getUserInfor();

	getArticle();
	//获取文章

	getType();
	//获取文章类型
	
	$("#searchBtn").click(function(){
		if($("#search").css("display")=="none")
			$("#search").slideDown();
		else
			$("#search").slideUp();
	});

	getArtHot();

	$("#serchTitle").click(function(){
		serchBytitle();
	});

	$("#allArt").click(function(){
		getArticle();
	});

	getMessage();
});

var artList=[];
//全局变量 文章列表对象
var artHotList=[];
var pageEach=5;
var pageIndex=1;
var pageIndexofType=1;
var color=["success","info","warning","danger"];


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

function getArticle(){
	var str;
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Art?method=ShowArt',
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
			artList=data.result[0].Data;
			for(var i=0;i<artList.length;i++){
				str=artList[i].content;
				var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<h4 class=\"media-heading\">"+"<a href=\"showArt.html?id="+
				   artList[i].artid+"\">"+artList[i].artitle+"</a></h4>"+   
				    "<h4><small>"+
				   		"<span>类型：</span>"+
				    	"<span>"+artList[i].typename+"</span> "+
				    	"<span>阅读：</span>"+
				    	"<span>"+artList[i].times+"</span> "+
				    	"<span>评论：</span>"+
				    	"<span>"+artList[i].comsum+"</span> "+
				    	"<span>时间：</span>"+
				    	"<span>"+artList[i].uptime+"</span> "+		
				    "</small></h4>"+"<p>"+str.substr(0,200) +'...'+"</p>"
				  "</div></div>";
				 $("#artList").append(txt);
			}
			pageIndex=1;	
			$("#search").slideUp();
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function setPage(index){
	pageIndex=index;
	getArticle();
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
			//console.log(data);
			$("#msgContent").text(data.result[0].Data[0].mcontent);
			$("#msgTime").text(data.result[0].Data[0].mtime);
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function getType(){
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
				for(i=0,j=0;i<array.length;i++,j++){
					if(j>color.length-1) j=0;
					var txt=" <button type=\"button\" id=\"searchType\" class=\"btn typebtn btn\-"+color[j]+"\" value=\""+array[i].typeid+"\">"+
					array[i].typename+"</button> ";
					$("#type").append(txt);
					//将option元素添加到select里
				}
				$("button").filter("#searchType").on("click",function(event){
					searchByType(event);
				})	
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

function searchByType(event){
	var str;
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=QtypeArt',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:"1",
			typeid:event.target.value,
			Page_each:pageEach,
			PageNumber:pageIndexofType
		},
		success:function(data){
			if(data.code=="0"){
				$("#pageNum").empty();
				for(var i=0;i<data.result[0].sumPage;i++)
					$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPageofType("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
				$("#artList").empty();
				artList=data.result[0].Data;
				for(var i=0;i<artList.length;i++){
					str=artList[i].content;
					var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
					    "<h4 class=\"media-heading\">"+"<a href=\"showArt.html?id="+
					   artList[i].artid+"\">"+artList[i].artitle+"</a></h4>"+   
					    "<h4><small>"+
					   		"<span>类型：</span>"+
					    	"<span>"+artList[i].typename+"</span> "+
					    	"<span>阅读：</span>"+
					    	"<span>"+artList[i].times+"</span> "+
					    	"<span>评论：</span>"+
					    	"<span>"+artList[i].comsum+"</span> "+
					    	"<span>时间：</span>"+
					    	"<span>"+artList[i].uptime+"</span> "+		
					    "</small></h4>"+"<p>"+str.substr(0,200) +'...'+"</p>"
					  "</div></div>";
					 $("#artList").append(txt);
				}
				pageIndexofType=1;
				$("#search").slideUp();
			}
		},
		error:function(){
			 alert("发生错误！")
			 //在console输出错误
		},
	});
}

function setPageofType(index){
	pageIndexofType=index;
	searchByType();
}

function serchBytitle(){
	var str;
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Art?method=QtitleArt',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:"1",
			artitle:$("#inputTitle").val()
		},
		success:function(data){
			if(data.code=="0"){
				artList=data.result;
				$("#pageNum").empty();
				$("#artList").empty();
				for(var i=0;i<artList.length;i++){
					str=artList[i].content;
					var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
					    "<h4 class=\"media-heading\">"+"<a href=\"showArt.html?id="+
					   artList[i].artid+"\">"+artList[i].artitle+"</a></h4>"+   
					    "<h4><small>"+
					   		"<span>类型：</span>"+
					    	"<span>"+artList[i].typename+"</span> "+
					    	"<span>阅读：</span>"+
					    	"<span>"+artList[i].times+"</span> "+
					    	"<span>评论：</span>"+
					    	"<span>"+artList[i].comsum+"</span> "+
					    	"<span>时间：</span>"+
					    	"<span>"+artList[i].uptime+"</span> "+		
					    "</small></h4>"+"<p>"+str.substr(0,200) +'...'+"</p>"
					  "</div></div>";
					 $("#artList").append(txt);
				}
				$("#search").slideUp();
			}
		},
		error:function(){
			 alert("发生错误！")
			 //在console输出错误
		},
	});
}
