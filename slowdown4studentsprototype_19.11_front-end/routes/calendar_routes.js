var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (!req.session || !req.session.authenticated) {
        res.render('unauthorised', { status: 403 });
	    return;
    }
    else { res.render('calendar')}
});

module.exports = router; 