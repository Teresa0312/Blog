$(document).ready(function(){
	$("#btnSubmit").click(function(){
		//用户点击登录按钮
		Login();
	});
});


//登录
function Login(){
	if(Check()){
		//Check()检查用户是否输入了手机号和密码
		LoginSuccess();
		//验证数据
	}
}


//检查用户输入
function Check(){
	if($("#inputNumber").val()==""){
		//用户没有输入手机号
		alert("请输入手机号！");
		$("#inputNumber").focus();
		//获得焦点
		return false;
	}
	if($("#inputPassword").val()==""){
		//用户没有输入密码
		alert("请输入密码！");
		$("#inputPassword").focus();
		//获得焦点
		return false;
	}
	return true;
}

//验证数据
function LoginSuccess(){
	$.ajax({
		type:"POST",
		//请求方式
		url:"http://1483104508.55555.io/blog/User?method=login",
		//请求URL
		dataType:'JSON',
		//预期服务器返回的数据类型 返回 JSON 数据
		data:'usertel='+$("#inputNumber").val()+'&password='+$("#inputPassword").val(),
		//提交的数据
		success:function(data){
			//请求成功后调用的回调函数
			console.log(data);
			if(data.code=="2")
				alert("此账号已禁止登陆！");//登录失败
			else if(data.code=="1")
				alert("密码错误！");//登录失败
			else if(data.code=="3")
				alert("用户不存在！");//登录失败
			else{
				$.cookie(
					"tel",
					$("#inputNumber").val(),
					{path: '/'}
					//expires 有效时间，如果此处留空，则浏览器关闭此cookie就失效
					//path 有效路径
				);
				$.cookie(
					"pass",
					$("#inputPassword").val(),
					{path: '/'}
				);
				
				//登陆成功
				window.location.href='../User/MyCenter.html';			
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//请求失败时被调用的函数
			 alert("发生错误！");
			 console.log(XMLHttpRequest);
			 console.log(textStatus);
			 console.log(errorThrown);
			 //在console输出错误
		},
	});
}				