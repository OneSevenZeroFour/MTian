var multer = require("multer");
var express = require('express');
var app = require('express')();
var server = require('http').createServer();
var http = require('http');
var socket = require("socket.io");
var io = socket(server);
var bodyParser = require('body-parser');
//引入mysql的第三方模块
var mysql = require('mysql');
var fs = require("fs");

var connection = mysql.createConnection({
    hostname:'localhost',
    user:'root',
    password:'',
    database:'momo'
});
connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); 

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        cb(null, '../img')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        var urlimg = file.fieldname + parseInt(Math.random()*100)+ Date.now() + "." + fileFormat[fileFormat.length - 1];
        cb(null,urlimg);        
    }
});
var upload = multer({
    storage: storage
});

// 徐啸的
// 
// 上传头像
app.post('/chuan',upload.any(),function(req,res,next){
    res.append("Access-Control-Allow-Origin","*");
    res.send(req.files);
})

app.post('/getAccount', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
connection.query(`update users set faces='${req.body.imgurl}'where tel='${req.body.username}'`, function(error, results, fields) {
        res.send();
    });
})


// 获取用户所有信息
app.get('/xgetAll',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    connection.query(`SELECT * FROM users where tel='${req.query.username}' and type=${req.query.type}`, function(error, results, fields) {
                    if(error) throw error;
                    
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})

//获取购房需求
app.get('/xgetFang',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    connection.query(`SELECT * FROM mtwt where rentType='${req.query.rentType}'`, function(error, results, fields) {
                    if(error) throw error;
                    
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})

//添加二手房关注
app.post('/guanzhu',function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    console.log(req.body);
    var data = req.body
    var sqlyj = `INSERT INTO users (id,tel,img,title,tags,downPay,monthPay,address,type) values('${data.id}','${data.username}','${data.img}','${data.title}','${data.tags}','${data.downPay}','${data.monthPay}','${data.address}','${data.type}')`
    connection.query(sqlyj, function(error, results, fields) {
        if(error) throw error;
               console.log(results)

    });
    
   
})



//添加顾问关注
app.post('/guwen',function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    console.log(req.body);
    var data = req.body
//  connection.query(`SELECT * FROM users where id='${data.id}'`, function(error, results, fields) {
//                  if(error) throw error;
//                  if(results.length!=0){
//                  	console.log(666)
//                  }
//                  console.log(results.length)
//              });
    var sqlyj = `INSERT INTO users (id,tel,guwen) values('${data.id}','${data.username}','${data.guwen}')`
    connection.query(sqlyj, function(error, results, fields) {
        if(error) throw error;
               console.log(results)

    });
    
   
})


app.get('/getguwen',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    connection.query(`SELECT * FROM users where faces='${req.query.faces}' and tel=${req.query.username}`, function(error, results, fields) {
                    if(error) throw error;
                    
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})

//修改顾问关注
app.get('/delguwen',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.query);
    connection.query(`update users set type='${req.query.type}' where id='${req.query.id}'`, function(error, results, fields) {
                    if(error) throw error;
                    
                    res.end(JSON.stringify({
                        status: 1,
                        results
                    }))
                });
})


app.post('/chushi',function(req,res){
    res.append("Access-Control-Allow-Origin", "*")
    console.log(req.body);
    var data = req.body
    var sqlyj = `select * from users where id='${data.id}' `
    connection.query(sqlyj, function(error, results, fields) {
        if(error) throw error;
               console.log(results)
		 res.send(results);
    });
    
   
})





//刘韵
var data = "";

app.get('/city',function(req, resp){
    // console.log(req.query.type,req.query.cityid,req.query.kw)
    resp.append('Access-Control-Allow-Origin','*');

    var myurl = 'http://120.76.205.241:8000/house/maitianzaixian?cityid='+req.query.cityid+'&kw='+req.query.kw+'&type='+req.query.type+'&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF';

    http.get(myurl,function(res){
      res.setEncoding('utf8')
      res.on('data',function(chunk){
        
        data += chunk;
      })
      res.on('end',function(){
        
         resp.send(data)
         console.log(data)
         
      })
    }).on("error", function() {
        console.log("请求myUrl地址出错！");
    });
})



// 江伟的
app.get('/cina',function(req, res){
      res.append('Access-Control-Allow-Origin','*');
      var para = req.query.para;
      console.log(para)
      getmsg(para,res);
      
})

function getmsg(myUrl,res){
    var data = '';
    http.get(myUrl, function(request) {
        //监听myUrl地址的请求过程
        //设置编码格式
        request.setEncoding("utf8");
    
        //数据传输过程中会不断触发data信号
        request.on("data", function(response) {
            data += response;
        });
    
        //当数据传输结束触发end
        request.on("end", function() {
            //把data数据返回前端
            res.send(data);
        });
    }).on("error", function() {
        console.log("请求myUrl地址出错！");
    });
}

app.get('/jwrent',function(req,res){
	res.append('Access-Control-Allow-Origin','*');
	console.log(req.query)
	var data=req.query;
	var sql = `insert into MTWT(username,tel,price,type,address,community,city,msg,rentType)
  						values('${data.username}','${data.tel}','${data.price}',
  						'${data.type}','${data.address}','${data.community}','${data.city}','${data.msg}','${data.rentType}')`;
connection.query(sql,
function(error, results, fields) {
    if(error) throw error;
//             console.log(results)
        var total=results;
        res.send('success');

});

})


app.listen(23456);
console.log("开启服务器")