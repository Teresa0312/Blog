$(document).ready(function(){

	(function($){
		$.getData=function(name){
			var reg=new RegExp("(^|&)"+name+"=([^&]+)(&|$)?");
			var result = window.location.search.substr(1).match(reg);
			if (result!= null) return result[2]; return null;		
		}
	})(jQuery);

	$("#name_bottom").text($.cookie('tel'));


	getUserInfor();

	var id=$.getData('id');

	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Art?method=One",
		dataType:"JSON",
		data:{artid:id},
		success:function (data) {
		},
	});


	getArticle(id);

	getArtHot();

	getComment(id);

	getMessage();

	$("#addCom").click(function(){
		addComment(id);
	});
});

var artHotList=[];
var comList=[];
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

function getArticle(id){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Art?method=This_Art",
		dataType:"JSON",
		data:{
			usertel:"1",
			artid:id
		},
		success:function (data) {
			var array=data.result[0];
			$("#title").text(array.artitle);
			var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<h4><small>"+
				   	"<span>类型：</span>"+
				    "<span>"+array.typename+"</span> "+
				    "<span>阅读：</span>"+
				    "<span>"+array.times+"</span> "+
				    "<span>评论：</span>"+
				    "<span>"+array.comsum+"</span> "+
				    "<span>时间：</span>"+
				    "<span>"+array.uptime+"</span> "+		
				    "</small></h4>"+"<p>"+array.content+"</p>"
				  "</div></div>";
				 $("#article").append(txt);
				 $("#title").text(array.article);
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
				  "</div></div> ";
				 $("#artHot").append(txt);
			}
			
		},
		error:function(){
			//alert("发生错误！");
		},
	});
}


function getComment(id){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Com?method=ShowCom',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			artid:id,
			Each:pageEach,
			PageNumber:pageIndex
		},
		success:function (data) {
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+","+id+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#comments").empty();
			comList=data.result[0].Data;
			for(var i=0;i<comList.length;i++){
				var txt="<div class=\"media\">"+"<div class=\"media-body\">"+
				    "<p>"+comList[i].comcontent+"</p>"+
				    "<h4><small>"+comList[i].comtime+"</small></h4>"+
				  "</div></div>";
				 $("#comments").append(txt);
			}		
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

function addComment(id){
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Com?method=add',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			artid:id,
			comcontent:UM.getEditor('myEditor').getContentTxt()
		},
		success:function(data){
			if(data.code=="0"){
				alert("发表评论成功！");
				window.location.reload();
			}
			else
				alert("发表评论失败！");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
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

