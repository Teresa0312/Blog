$(document).ready(function(){

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
				//console.log(ansList.eq(1).val());
				alert("回答正确！");
				$(".inputAns").css("display","none");
				$(".resetPass").css("display","block");
			}
			else
				alert("回答错误！");
		},
		error:function(){
			 alert("发生错误！");
			 //在console输出错误
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
				window.location.href='../User/Login.html';
			}
			else
				alert("修改失败！");
		},
		error:function(){
			
		},	
	});
}