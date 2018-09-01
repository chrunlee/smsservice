//自己使用的短信服务，提供给各个应用来调用。要求：外网无法访问，不然就死了。

//提供web服务，同时提供接口，可通过调用发送，只支持自己的哦。
var express = require('express');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var sms = require('./sms');

app.post('/sms',function(req,res,next){
	//1.提供模版ID
	var phone = req.body.phone,templateId = req.body.templateId,params = req.body.params.split('_');
	sms(phone,templateId,params).then(function(){
		res.json({success : true,msg : '成功'})
	}).catch(function(err){
		res.json({success : false,msg : '失败'})
	})
})


app.listen(2500,function(){
	console.log('短信服务启动，端口:2500')
})

