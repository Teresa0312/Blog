$(document).ready(function(){
	getUserInfor();

	getPicture();

	getArtHot();

	getMessage();
});

var picList=[];
//全局变量 文章列表对象
var artHotList=[];
var pageEach=9;
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
	});
}

function getPicture(){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Pic?method=PicList',
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
			$("#pictures").empty();
			picList=data.result[0].Data;
			for(var i=0;i<picList.length;i++){
				var txt="<div class=\"col-md-4\" id=\"pics\">"+
				    "<div class=\"thumbnail\"><a href=\"../Public/showPic.html?id="+
				  		picList[i]['picid']+"\">"+
				      "<img id=\"layer"+i+"\" src=\""+picList[i]['picpath']+"\"></a>"+
				      "<h4>"+picList[i]['pictitle']+"</h4>"+
				      "<p>"+picList[i]['pictime']+"</p>"+  
				    "</div></div>";
				 $("#pictures").append(txt);
			}
			pageIndex=1;	
			var inde=[];
			for(var j=0;j<pageEach;j++){
				inde[j]=j;
			}
			for(var j=0;j<pageEach;j++){
				var w =$("#pics").width();
				$("#layer"+j).height(w*0.9);
			}
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function setPage(index){
	pageIndex=index;
	getPicture();
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