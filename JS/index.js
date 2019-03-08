$(document).ready(function(){
	getInfo();
	getArtHot();
	getPicture();

	$("#btnSubmit").click(function(){
		Login();
	});

	$(".inputAns").css("display","none");
	$(".resetPass").css("display","none");
	
	$("#butSubmit_1").click(function(){
		CheckTel();
	});
	//检查手机号

	$("#butSubmit_2").click(function(){
		CheckAns();
	});
	//检查密保问题

	$("#butSubmit_3").click(function(){
		CheckPass();
	});
	//检查密码
});
function getInfo(){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/User?method=ShowInfo",
		dataType:"JSON",
		data:{usertel:"1"},
		success:function (data) {
			//console.log(data);
			var array=data.result;
			$("#username").text(array[0].uname);
			$("#signature").text(array[0].signature);
			$("#logoImg").attr("src",array[0].picture);
			$("#infor").attr("class","col-md-12 top animated flipInX");
		},
		error:function(){
			alert("发生错误！");
		}
	});
}

function getArtHot(){
	var artHotList=[];
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/Art?method=ShowArtHot",
		dataType:"JSON",
		data:{usertel:"1"},
		success:function (data) {
			//console.log(data);
			artHotList=data.result;
			for(var i=0;i<4;i++){
				var str=artHotList[i].content;
				var txt=" <div class=\"col-md-3\"><div class=\"panel panel-default \"><div class=\"panel-heading\">"+
				"<h3 class=\"panel-title\">"+"<a href=\"Public/showArt.html?id="+
				    artHotList[i].artid+"\">"+artHotList[i].artitle+"</a></h3></div><div class=\"panel-body\">"+
				str.substr(0,100)+"..."+"</div></div></div>";
				 $("#artHot").append(txt);
			}
		},
		error:function(){
			alert("发生错误！");
		}
	});
}

function getPicture(){
	var picList=[];
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Pic?method=PicList',
		//请求url
		dataType:"json",
		//后台返回的数据类型
		data:{
			usertel:"1",
			Page_each:6,
			PageNumber:1
		},
		success:function (data) {
			picList=data.result[0].Data;
			console.log(picList);
			var index=["A","B","C","D","E","F"];
			for(var i=0,j=0;i<picList.length;i++,j++){
				$("#pic"+index[j]).attr("src",picList[i]['picpath']);
			}
		},
		error:function(){
			alert("发生错误！");
		},
	});
}

function Login(){
	if(Check()){
		LoginSuccess();
	}
}

function Check(){
	if($("#inputNumber").val()==""){
		alert("请输入手机号！");
		$("#inputNumber").focus();
		return false;
	}
	if($("#inputPassword").val()==""){
		alert("请输入密码！");
		$("#inputPassword").focus();
		return false;
	}
	return true;
}
function LoginSuccess(){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/User?method=login",
		dataType:'JSON',
		//预期服务器返回的数据类型 返回 JSON 数据
		data:'usertel='+$("#inputNumber").val()+'&password='+$("#inputPassword").val(),
		success:function(data){
			console.log(data);
			if(data.code=="2")
				alert("此账号已禁止登陆！");
			else if(data.code=="1")
				alert("密码错误！");
			else if(data.code=="3")
				alert("用户不存在！");
			else{
				$.cookie(
					"tel",
					$("#inputNumber").val(),
					{path: '/'}
				);
				$.cookie(
					"pass",
					$("#inputPassword").val(),
					{path: '/'}
				);
				window.location.href='User/MyCenter.html';			
			}
		},
		error:function(){
			 alert("发生错误！");
		},
	});
}		

function CheckTel(){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/User?method=Input',
		dataType:"JSON",
		data:{'usertel':$("#InputNum").val()},
		success:function(data){
			console.log(data);
			if(data.code=="0"){
				$(".inputTel").css("display","none");
				$(".inputAns").css("display","block");
				ShowQue();
				//显示密保问题
			}
			else
				alert("没有此用户！");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});
}

function ShowQue(){
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/Que?method=ShowQues',
		dataType:"JSON",
		data:{'usertel':$("#InputNum").val()},
		success:function(data){
			//console.log(data);
			var array=data.result;
			//获取问题
			console.log(array);
			var queList=$("span").siblings("#Question");
			//获取填入问题的span
			queList.eq(0).text(array[0].question); 
			queList.eq(1).text(array[1].question);
			queList.eq(2).text(array[2].question);
			//填入问题
			//console.log(queList.eq(0).text());
		},
		error:function(){
			 alert("发生错误！");
		},
	});
}

function CheckAns(){ 
	var ansList=$(".form-group").children("#InputAns");
	//console.log(ansList);
	var jsonStr=
	[{
		"usertel":$("#InputNum").val(),
		"index":
		[{
			"answer":ansList.eq(0).val()
		},
		{
			"answer":ansList.eq(1).val()
		},
		{
			"answer":ansList.eq(2).val()
		}]
	}];
	$.ajax({ 
		type:"POST",
		url:'http://1483104508.55555.io/blog/Que?method=Refound',
		dataType:"JSON",
		data:"jsonStr="+JSON.stringify(jsonStr),
		success:function(data){
			if(data.code=="0")
			{
				$(".inputAns").css("display","none");
				$(".resetPass").css("display","block");
			}
			else
				alert("回答错误！");
		},
		error:function(){
			 alert("发生错误！");
		},		
	});

}

function CheckPass(){
	var pass=$(".form-group").children("#InputPass");
	if(pass.eq(0).val()==pass.eq(1).val())
		AlterPass(pass.eq(0).val());
	else
		alert("两次输入密码不一致！");
}

function AlterPass(pass){
	$.ajax({
		type:"POST",
		url:"http://1483104508.55555.io/blog/User?method=Alterpasswd",
		dataType:"json",
		data:{
			'usertel':$("#InputNum").val(),
			'password':pass,
		},
		success:function(data){
			if(data.code=="0")
			{
				alert("修改成功！");
				window.location.reload();
			}
			else
				alert("修改失败！");
		},
		error:function(){
			alert("发生错误");
		},	
	});
}		