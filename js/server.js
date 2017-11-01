var express = require("express")
var app = express();
var http = require("http");
var data = "";

app.get('/city',function(req, resp){
	console.log(req.query.type,req.query.cityid,req.query.kw)
    resp.append('Access-Control-Allow-Origin','*');

    var myurl = 'http://120.76.205.241:8000/house/maitianzaixian?cityid='+req.query.cityid+'&kw='+req.query.kw+'&type='+req.query.type+'&pageToken=1&apikey=RMw9hk7rtVbPfEkQZduqrCvuWs9PSeU7ePDQP0YKrtGQKxuG5d7uiWYeJ4t8vkPF';

    http.get(myurl,function(res){
	  res.setEncoding('utf8')
	  res.on('data',function(chunk){
	  	
	    data += chunk;
	  })
	  res.on('end',function(){
	   
	   	 resp.send(data)
	   	 
	  })
	}).end();
})


app.listen(2345);
console.log("ok")
