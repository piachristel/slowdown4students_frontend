exports.index = function(req, res) {
    var aut = req.session.authenticated;
    console.log(aut);
    res.render('home', { authenticated: aut });
};