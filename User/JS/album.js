$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));
	$("#inputTel").val($.cookie('tel'));

	showAlbumList();
	//显示照片列表
	
});

var albumList=[];
//全局变量 相册列表
var pageEach=6;
var pageIndex=1;

function showAlbumList(){
	var user=$.cookie('tel');
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Pic?method=PicList',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			Page_each:pageEach,
			PageNumber:pageIndex
		},
		success:function(data){
			console.log(data);
			$("#pageNum").empty();
			for(var i=0;i<data.result[0].sumPage;i++)
				$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
			$("#showPics").empty();
			albumList=data.result[0].Data;
			for(i=0;i<data.result[0].Data.length;i++){
				var txt="<ul class=\"list-group col-md-3 picList\" id=\"picList\">"+
					  	"<li class=\"list-group-item\"><a href=\"../Public/showPic.html?id="+
				  		albumList[i]['picid']+"\">"+
				 	 	"<img id=\"layer"+i+"\" src=\""+albumList[i]['picpath']+"\" /></a></li>"+
				  		"<li class=\"list-group-item\"><a href=\"../public/showPic.html?id=\""+
				  		albumList[i]['picid']+"\">"+
				 	 	"<span id=\"img-title\">"+albumList[i]['pictitle']+"</a></span>"+
				  		"<input type=\"text\" class=\"form-control\" style=\"display:none\" id=\"inputTitle\">"+"</li>"+ 
						"<li class=\"list-group-item\">"+albumList[i]['pictime']+"</li>"+
				 		"<li class=\"list-group-item\">"+
				  	 	"<button class=\"btn btn-danger\" id=\"deletPic\">删除</button> </li></ul>";
				$("#showPics").append(txt);
				//添加到文章表格中
			}
			btnEvent();
			//按钮绑定事件
			pageIndex=1;
			var inde=[];
			for(var j=0;j<pageEach;j++){
				inde[j]=j;
			}
			for(var j=0;j<pageEach;j++){
				var w =$("#picList").width();
				$("#layer"+j).height(w*0.73);
			}
		}
	});
}

function setPage(index){
	pageIndex=index;
	showAlbumList();
}


//按钮绑定事件
function btnEvent(){
	var btnList=$("button");
	//获得所有按钮

	btnList.filter("#deletPic").on('click',function(event){
		deletPicture(event);
		window.lacation.href='Album.html';
	});
	//删除相册按钮
}


//删除
function deletPicture(event){
	var user=$.cookie('tel');
	//获得cookie中的手机号
	var pic=$(event.target).parents("#picList");
	//获得id为picList的父元素
	var index=pic.index();
	//获得父元素的索引（从1开始）
	var picId=albumList[index]['picid'];
	//获得要删除的照片id
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Pic?method=DelPic',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			picid:picId
		},
		success:function(data){
			if(data.code=="0"){
				alert("删除照片成功！");	
				window.lacation.reload();			
			}
			else
				alert("删除照片失败！");
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

