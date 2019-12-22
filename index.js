var fs = require('fs');
var path = require('path');
var express = require('express')
var bodyParser=require('body-parser')
var app = express()
const request = require('request');
const key = 'b61f76f10b6af2b5eb201a3d26c1b47b'
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))


exports.get = function(event, context, callback) {
  var contents = fs.readFileSync(`public${path.sep}index.html`);
  var result = {
    statusCode: 200,
    body: contents.toString(),
    headers: {'content-type': 'text/html'}
  };
  
  app.post('/getweather',(req,res)=>{
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    request(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`,function(err, response, body){
        if(err){
            res.send(err)
        }
        else{
            let weather = JSON.parse(body)
            res.send({temp:Math.ceil(weather.main.temp/10),city:weather.name})
        }
        
    })
})

app.post('/getcity',(req,res)=>{
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    request(`https://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.long}&appid=${key}`,function(err, response, body){
        if(err){
            console.log(err)
        }
        else{
            let weather = JSON.parse(body)
            res.send({city:weather.name,temp:Math.ceil(weather.main.temp/10)})
        }
        
    })
})


};

