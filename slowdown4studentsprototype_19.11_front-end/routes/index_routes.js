var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index_controller');

// GET /, renders the home view
router.get('/', function(req, res, next) {
  var aut = req.session.authenticated;
  res.render('home', { authenticated: aut });
});
// guarantees access to the method of this file for other files, e.g. for app.js
module.exports = router; 


var request = require('request');

router.post('/login', indexController.login);
router.get('/logout', indexController.logout);