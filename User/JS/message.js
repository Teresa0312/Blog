$(document).ready(function(){
	$("#name_bottom").text($.cookie('tel'));
	showMesList();
	//显示留言列表

});

var mesList=[];
//全局变量 留言列表
var pageEach=5;
var pageIndex=1;

function showMesList(){
	var user=$.cookie('tel');
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Mes?method=ShowMes',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:user,
			Page_each:pageEach,
			PageNumber:pageIndex
		},
		success:function(data){
			if(data.code=="0"){
				$("#pageNum").empty();
				for(var i=0;i<data.result[0].sumPage;i++)
					$("#pageNum").append("<li><a href=\"javascript:void(0);\" onclick=\"setPage("+(i+1)+")\" id=\"page\">"+(i+1)+"</a></li>");
				$("#messageList").empty();
				$("#messageList").append("<tr><th class=\"message\">留言</th><th>时间</th>"+
					"<th>操作</th></tr>");
				mesList=data.result[0].Data;
				for(var i=0;i<mesList.length;i++){
					var txt="<tr>"+
						   	"<td>"+mesList[i].mcontent+"</td>"+
						   	"<td>"+mesList[i].mtime+"</td>"+
						   	"<td>"+
						   		"<button class=\"btn btn-danger\" id=\"deletMes\">删除</button>"+
						   	"</td>"+
						   "</tr>";
					$("#messageList").append(txt);
				  	//添加到留言列表
				}
				btnEvent();
				//按钮绑定事件
			}
			else
				alert("显示留言失败！")
		},
		error:function(){
			alert("发生错误！");
		},
		
	});
}

//按钮绑定事件
function btnEvent(){
	var btnList=$("button");
	//获得所有按钮

	btnList.filter("#deletMes").on('click',function(event){
		deletVideo(event);
	});
	//删除留言按钮
}

//删除留言
function deletVideo(event){
	var tr=$(event.target).parents("tr");
	//得到父元素tr
	var index=tr.index()-1;
	//得到tr的索引
	var mesId=mesList[index].mid;
	//获得要删除的留言id
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/Mes?method=DelterMes',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			mid:mesId
		},
		success:function(data){
			if(data.code=="0"){
				alert("删除留言成功！");
				window.lacation.reload();
				//重新载入页面
			}
			else
				alert("删除留言失败！")
		},
		error:function(){
			alert("发生错误！");
		},
	});

}
