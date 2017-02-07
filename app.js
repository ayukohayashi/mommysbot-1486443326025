/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

//add2017/2/7
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var request = require('request');

app.post('/api', function(req, res) {
  var options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: "text",
        text: req.body.events[0].message.text
      }]
    },
    auth: {
      bearer: 'bBy70HI0o27tUayJmRf5enI7Q7iBIPxaUg7UScUTRH5wHaPs0niDH90Npf6Q4Mju5HJ4wNIKahXaSqw4As1MCGKnsnrNu+6PI2wHs7VLyvgB1AakOirVxSdd4t9m4+z5G8UONQfbFVUQozq1tHLGugdB04t89/1O/w1cDnyilFU='
    },
    json: true
  };
  request(options, function(err, res, body) {
    console.log(JSON.stringify(res));
  });
  res.send('OK');
});
//add end

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
