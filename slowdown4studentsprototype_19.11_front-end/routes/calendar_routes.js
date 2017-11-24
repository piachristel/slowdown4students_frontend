var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('calendar', {authenticated: true})
});

module.exports = router; 

