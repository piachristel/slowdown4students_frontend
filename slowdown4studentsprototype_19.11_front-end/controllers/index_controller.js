var movieModel = require('../models/user_model');


exports.login = function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;      
        res.redirect(app.lookupRoute('homepage'));
    } else {
        //req.flash('error', 'Username and password are incorrect');
        res.redirect(app.lookupRoute('homepage'));
}
};

exports.logout = function(req,res){
    delete req.session.authenticated;
    res.redirect(app.lookupRoute('homepage'));
};

