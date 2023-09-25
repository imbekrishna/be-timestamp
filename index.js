// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/", function(req, res){
  res.json({
    unix: new Date().valueOf(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:date", function(req, res){
  let passedDate = req.params.date;
  let dateString;

  if(!isNaN(Number(passedDate))){
    dateString = new Date(Number(req.params.date));
  }else{
    dateString = new Date(req.params.date);
  }

  if (dateString instanceof Date && !isNaN(dateString)){
    res.json({
      unix: dateString.valueOf(),
      utc: dateString.toUTCString(),
    })
  }else{
    res.json({error: "Invalid Date"})
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
