$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));

	showVideoList();
	//显示视频列表

	$("#newVid").click(function(){
		addVideo();
	});
	//新增视频
	
});

var videoList=[];
//全局变量 视频列表
var pageEach=10;
var pageIndex=1;

//显示视频列表
function showVideoList(){
	var user=$.cookie('tel');
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Vid?method=VidList',
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
			$("#videoTable").empty();
			$("#videoTable").append("<tr><th class=\"videoTitle\">视频标题</th>"+
				"<th>时间</th><th>操作</th></tr>");
			videoList=data.result[0].Data;
			console.log(videoList);
			for(i=0;i<data.result[0].Data.length;i++){
				//添加元素
				var txt="<tr>"+
						   "<td><a id=\"v-title\"href=\""+videoList[i].vpath+"\">"+videoList[i].vtitle+"</a>"+
						   	"</td>"+
						  	"<td>"+videoList[i].vtime+"</td>"+
						   	"<td>"+
						   		" <button class=\"btn btn-danger\" id=\"deletVid\">删除</button>"+
						   	"</td>"+
						   "</tr>";
				$("#videoTable").append(txt);
				//添加到视频列表
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
	showVideoList();
}

//按钮绑定事件
function btnEvent(){
	var btnList=$("button");
	//获得所有按钮

	btnList.filter("#deletVid").on('click',function(event){
		deletVideo(event);
	});
	//删除视频按钮
}

//删除视频
function deletVideo(event){
	var user=$.cookie('tel');
	//获得cookie中的手机号
	var tr=$(event.target).parents("tr");
	//得到父元素tr
	var index=tr.index()-1;
	//得到tr的索引
	var vidId=videoList[index]['vid'];
	//获得要删除的视频id
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Vid?method=DelVid',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			vid:vidId
		},
		success:function(data){
			if(data.code=="0"){
				alert("删除视频成功！");
				window.lacation.reload();
				//重新载入页面
			}
			else
				alert("删除视频失败！")
		},
		error:function(){
			alert("发生错误！");
		},
	});

}

//上传视频
function addVideo(){
	var user=$.cookie('tel');
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Vid?method=AddVid',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			path:$("#inputVideoURL").val(),
			title:$("#inputVideoTitle").val()
		},
		success:function(data){
			if(data.code=="0"){
				alert("新增视频成功！");
				window.lacation.reload();
				//重新载入页面
			}
			else
				alert("新增视频失败！")
		},
		error:function(){
			alert("发生错误！");
		},
	});
}