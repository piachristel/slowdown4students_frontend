var movieModel = require('../models/user_model');


exports.login = function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;
        console.log(req.session.authenticated);
        res.redirect('/');
    } else {
        //req.flash('error', 'Username and password are incorrect');
        res.redirect('/');
        console.log("not ok");
}
};

