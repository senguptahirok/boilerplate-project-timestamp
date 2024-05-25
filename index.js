// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
/*
app.get('/api',function(req,res,next){
  req.time = new Date().toString();
  next();},function(req,res){
    res.send({time: req.time});
  });

  app.get('/api/:date',function(req,res,next){
  console.log('date = ' + req.params.date);
  req.time = new Date(req.params.date).toString();
  console.log('current time = ' + req.time);
  next();},function(req,res){
    res.send ({time: req.time});
  });
*/
app.get('/api',function(req,res){
  req.time = new Date().toUTCString();
  let unixTime = new Date().getTime();
  res.json({"unix": unixTime, "utc": req.time});
})
/*
app.get('/api/:date',function(req,res){
  req.time = new Date(req.params.date).toUTCString();
  let unixTime = new Date().getTime(req.param.date);
  res.send({"unix": unixTime, "utc": req.time});
})
*/
/*
app.get('/api/:user_unix_ts',function(req,res){
  req.time = new Date(req.params.user_unix_ts * 1e3).toLocaleString();
  res.send({"unix": req.params.user_unix_ts, "utc": req.time});
})
*/
app.get('/api/:date?',function(req,res){
  let regex01 = /\d+[-/]/g;
//  let regex02 = /\d+/g;
  let regex02 = /\d{5,}/g;
  let userD = req.params.date;
  let dateInt = parseInt(userD);
  let unixTime = ' ';
  if (regex01.test(userD)){
    req.time = new Date(userD).toUTCString();
    unixTime = new Date(userD).getTime();
    if (req.time === 'Invalid Date')
      res.json({'error': 'Invalid Date'});
//    else res.send({'unix': unixTime, 'utc':req.time});
    else res.json({'unix': unixTime, 'utc': req.time});

  }
  else if (regex02.test(userD)){ 
//         let utcD = new Date(dateInt).toLocaleString();
         let utcD = new Date(dateInt).toUTCString();         
//         let utcD = new Date(userD * 1000).valueOf();         
         res.json({'unix': dateInt, 'utc': utcD});
        }
        else res.json({'error': 'Invalid Date'});
  });

  // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
