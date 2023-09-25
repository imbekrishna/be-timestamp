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
app.get("/api/:date", function (req, res) {
  let dateParts = req.params.date.split('-')
  if(dateParts.length > 1){
    let parsed = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    res.json({unix: parsed.getTime(), utc: parsed.toString()});
  }else{
    let parsed = new Date(Number.parseInt(dateParts[0]));
    res.json({unix: parsed.getTime(), utc: parsed.toString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
