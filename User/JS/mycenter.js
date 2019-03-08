$(document).ready(function(){	

	GetInformation();
	//获取用户信息

	

	$("#alterInfor").click(function(){
		$("#showInfor").css("display","none");
		$("#alterForm").fadeIn();
	});
	//显示修改信息页面

	$("#inputNone").val($.cookie('tel'));

	$("#backInfor").click(function(){
		$("#alterForm").css("display","none");
		$("#showInfor").fadeIn();
	});
	//显示基本信息页面

	$("#alterQue").click(function(){
		$("#queAndans").css("display","none");
		$("#alterQueFrom").fadeIn();
	});
	//显示修改密保问题

	$("#backQue").click(function(){
		$("#alterQueFrom").css("display","none");
		$("#queAndans").fadeIn();
	});
	//返回密保问题页面

	$("#btnSubmit_1").click(function(){
		 ALterInfo();
	});
	//修改信息

	$("#btnSubmit_2").click(function(){
		Setting();
	});
	//设置密保

	$("#btnSubmit_3").click(function(){
		AlterAnsw();
	});
	//修改密保

	$("#Exit").click(function(){
		 CloseAccount();
	});
	//退出
});

//获取用户信息
function GetInformation(){
	var user=$.cookie("tel");
	//获取cookie中用户的手机号
	var Infor=$("span"); 
	//console.log(name);
	$.ajax({
		type:"POST",
		//请求方式
		url:'http://1483104508.55555.io/blog/User?method=ShowInfo',
		//请求url
		dataType:"json",
		//返回的数据类型
		data:{usertel:user},
		//将用户的手机号传给后台
		success:function(data){
			var array=data.result;
			//获取用户信息
			var que=data.code;
			Infor.siblings("#name").text(array[0].uname);	
			Infor.siblings("#name_bottom").text(user);
			Infor.siblings("#phoneNumber").text(user);	
			Infor.siblings("#birth").text(array[0].birth);	
			Infor.siblings("#star").text(array[0].star);	
			Infor.siblings("#qqNumber").text(array[0].qq);	
			Infor.siblings("#e-mail").text(array[0].email);	
			Infor.siblings("#gexing").text(array[0].signature);	
			$("img").attr("src",array[0].picture);
			var w =$("#useWidth").width();
			$("img").width(w*0.15);
			$("img").height(w*0.15);
			$("#picture").attr("src",array[0].picture);
			$("#inputName").val(array[0].uname);
			$("#inputSign").val(array[0].signature);
			$("#inputBirth").val(array[0].birth);
			$("#inputStar").val(array[0].star);
			$("#inputQQ").val(array[0].qq);
			$("#inputMail").val(array[0].email);
			PwdProtection(que);	
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});
}

//密保问题
function PwdProtection(que){
	if(que=="0"){
		//console.log(proList.eq(0).css("display"));
		$("#PwdProtect_2").css("display","block");
		$("#PwdProtect_1").css("display","none");	
		$.ajax({
			type:"POST",
			url:'http://1483104508.55555.io/blog/Que?method=ShowAnsw',
			dataType:"JSON",
			data:{'usertel':$.cookie("tel")},
			success:function(data){
				var arr=data.result;
				//获取问题
				console.log(arr);
				for(i=0;i<arr.length;i++){
					var txt="<div class=\"fdata\">"+
								"<p><span>问题"+(i+1)+"：</span>"+
								"<span class=\"value\" id=\"showQue\">"+
								arr[i].question+
								"</span></p>"+     
							"</div>"+
							"<div class=\"fdata\">"+
								"<p><span>答案"+(i+1)+"：</span>"+
								"<span class=\"value\" id=\"showQue\">"+
								arr[i].answer+
								"</span></p>"+     
							"</div>"
					$("#queAndans").append(txt);
					$("input").siblings("#ReInputQue").eq(i).val(arr[i].question);
					$("input").siblings("#ReInputAns").eq(i).val(arr[i].answer);
					//填入问题
				}
			},
			error:function(){
				 alert("发生错误！");
				 //在console输出错误
			},
		});
	}
	else{
		$("#PwdProtect_2").css("display","none");
		$("#PwdProtect_1").css("display","block");
	}
}

//修改信息
function  ALterInfo(){
	var user=$.cookie("tel");
	$.ajax({
		type:"POST",
		url:'http://1483104508.55555.io/blog/User?method=AlterInfo',
		dataType:"json",
		data:
			'usertel='+user+'&uname='+$("#inputName").val()+'&signature='+$("#inputSign").val()+'&birth='+$("#inputBirth").val()+'&star='+$("#inputStar").val()+'&qq='+$("#inputQQ").val()+'&email='+$("#inputMail").val(),
		
		success:function(data){	
			if(data.code=="0"){
				alert("您的个人信息已修改成功!");
				 window.location.reload();
				 //刷新页面
			}
			else{
				alert("您的个人信息修改失败!");
			}
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	
	});
}

//设置密保
function Setting(){
	//console.log($("#settingFrom").serialize());
	//在console输出表单值
	var user=$.cookie("tel");
	//获取用户手机号
	//console.log(user.text());
	//在console输出手机号
	var queList=$("input").siblings("#InputQue");
	//获取问题
	var ansList=$("input").siblings("#InputAns");
	//获取答案	
	var jsonStr=
	[{
		"usertel":user,
		"index":
		[{
			"question":queList.eq(0).val(),
			"answer":ansList.eq(0).val()
		},
		{
			"question":queList.eq(1).val(),
			"answer":ansList.eq(1).val()
		},
		{
			"question":queList.eq(2).val(),
			"answer":ansList.eq(2).val()
		}]
	}];			
	
	//console.log(jsonStr);  
	//在console输出JSON字符串 
	$.ajax({
		type:"POST",
		//请求方式
		url:"http://1483104508.55555.io/blog/Que?method=SetAnsw",
		//请求URL
		dataType:'JSON',
		//返回JSON数据
		data:"jsonStr="+JSON.stringify(jsonStr),
		//JSON.stringify 将原来的对象转换为字符串
		
		success:function(data){
			if(data.code=="1")
				alert("密保问题及答案设置失败！");
			if(data.code=="0")
			{
				alert("密保问题及答案设置成功！");
				var pwdPro=$("section").eq(2);
				var proList=pwdPro.children();
				proList.eq(0).css("display","none");
				proList.eq(1).css("display","block");
				window.location.reload();
			}
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});	
}

//修改密保
function AlterAnsw(){
	//console.log($("#settingFrom").serialize());
	//在console输出表单值
	var user=$.cookie("tel");
	//获取用户手机号
	//console.log(user.text());
	//在console输出手机号
	var queList=$("input").siblings("#ReInputQue");
	//获取问题
	var ansList=$("input").siblings("#ReInputAns");
	//获取答案
	var jsonStr=
	[{
		"usertel":user,
		"index":
		[{
			"question":queList.eq(0).val(),
			"answer":ansList.eq(0).val()
		},
		{
			"question":queList.eq(1).val(),
			"answer":ansList.eq(1).val()
		},
		{
			"question":queList.eq(2).val(),
			"answer":ansList.eq(2).val()
		}]
	}];			

	//console.log(jsonStr);
	//在console输出JSON字符串
	$.ajax({
		type:"POST",
		//请求方式
		url:"http://1483104508.55555.io/blog/Que?method=EditQest",
		//请求URL
		dataType:'JSON',
		//返回JSON数据
		data:"jsonStr="+JSON.stringify(jsonStr),
		//JSON.stringify 将原来的对象转换为字符串
		success:function(data){
			if(data.code=="1")
				alert("修改密保问题和答案失败！");
			if(data.code=="0"){
				alert("修改密保问题和答案成功！");
				window.location.reload();
			}
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
		},
	});	
}

//退出
function CloseAccount(){
	$.cookie("tel",null,{path:'/'});
	$.cookie("pass",null,{path:'/'});
	window.location.href='../index.html';
}