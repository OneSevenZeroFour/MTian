var express = require("express")
var app = express();
var http = require("http");
var mysql=require("mysql");
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    hostname:'localhost',
    user:'root',
    password:'',
    database:'momo'
});
connection.connect();

app.get('/cina',function(req, res){
      res.append('Access-Control-Allow-Origin','*');
      var para = req.query.para;
      console.log(para)
      getmsg(para,res);
      
})
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); 

console.log("ok")
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