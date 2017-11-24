// Instantiated Express and assigns the variable app to it.
// require('') is always used to load modules.
//https://github.com/dizlexik/express-reverse
var express = require('express'); // Calls the express module of node.
//make app global so you can access app.lookupRoute in controllers.
app = express(); // Calls the express function express(),
                    // the returned object - an Express application - is stored in the variable app
      
//frontend: To define route names. See below.
var namedRoutes = require('express-named-routes');
namedRoutes.extend(app);

//for flash error messages
var flash = require('connect-flash');
app.use(flash());

//for sessions, login and logout
// npm install express-session
var session = require('express-session');
app.use(session({ secret: 'example' }));

//Frontend: Helper function for Handlbar. So that url do not need to be hardcoded.
//https://www.npmjs.com/package/express-handlebars#helpers
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance. 
  helpers: {
      lookup: function(link) { return app.lookupRoute(link); }
  },
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutDir: __dirname + '/views/layouts/'
});

var path = require('path'); //Mainly used to join strings.
var bodyParser = require('body-parser') // For parsing the input of the user.

var index = require('./routes/index_routes'); // index catchs document index_routes.
var movies = require('./routes/movie_routes'); // movies catch document movie_routes.
var calendar = require('./routes/calendar_routes');

var mongo = require('./mongodb');

//frontend
//<!-- https://www.youtube.com/watch?v=1srD3Mdvf50 -->, 18.11.2017
//$npm install handlebars
//register own exphbs.engine instance
app.engine('hbs', hbs.engine);
// Creates html language from the view files
app.set('view engine', 'hbs');

//frontend:register partial template
var hbsPartial = require('hbs');
hbsPartial.registerPartials(__dirname + '/views/partials');

// For parsing the input of the user.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Makes rendering of views files possible, defines hbs standard.
app.set('views', path.join(__dirname, 'views'));
// Makes linking between views and stylesheets possible.
app.use(express.static(path.join(__dirname, 'public')));

//checkAuth is  called before every request.
//Needs to be written before the routes are called.
function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/calendar' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

	next();
}

app.use(checkAuth);

// Routing.
//frontend define routes so that they do not need to be hardcoded.
////https://www.npmjs.com/package/express-named-routes, 19.11.2017
app.defineRoute('homepage', '/');
app.defineRoute('calendar', '/calendar');
app.defineRoute('login', '/login');
app.defineRoute('logout', '/logout')
app.use('/', index);
app.use('/movies', movies);
app.use('/calendar', calendar);

// Enables to connect localhost on port 3000 to the application.
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});

// Makes API call every .. and stores result in popularMovies.
var schedule = require('node-schedule');
popularMovies = {};
j = schedule.scheduleJob('5 * * * * *', function(){
  console.log('API request for most popular movies!');
  var request = require('request');
  request('https://api.themoviedb.org/3/movie/popular?api_key=6d5fbbe716371a300e974cd7e7d8db49&language=en-UK&page=1&region=Switzerland&sort_by=popularity.desc?', function (error, response, body) {
   console.log('error:', error); // Print the error if one occurred and handle it
   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   //res.send(body)
   var jsondata = JSON.parse(body)
   popularMovies = {
     first: jsondata.results[0],
     second: jsondata.results[1],
     third: jsondata.results[2]
   }
   });
 });

