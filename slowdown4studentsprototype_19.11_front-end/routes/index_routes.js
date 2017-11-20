var express = require('express');
var router = express.Router();

// GET /, renders the home view
router.get('/', function(req, res, next) {
  res.render('home');
});
// guarantees access to the method of this file for other files, e.g. for app.js
module.exports = router; 


var request = require('request');


router.get('/external-api', function(req, res){ 

request('http://puppygifs.tumblr.com/api/read/json', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      res.send(body)
    });

})