var express = require('express');
var app = express();
var ejs = require('ejs');
var mongoose = require('mongoose');
var session = require('express-session');
// deal with mongoose configurations for promises real quick
mongoose.Promise = require('bluebird');
mongoose.Promise = require('q').Promise;
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');
var passport = require('passport');
var authController = require('./controllers/auth');
var port = process.env.PORT || 3000; // use environment port or just default to 3000

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
//TODO: fix secret session key to something actually secret
app.use(session({
  secret: 'Secret session key',
  saveUnitialized: true,
  resave: true
}));

// Set veiw engine to ejs
app.set('view engine', 'ejs');

// connect to mongodb
// TODO: add a keep alive to prevent connection closed
mongoose.connect('mongodb://localhost:27017/users', function(err) {
  if (err) throw err;
});
// make sure that mongoose was able to connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  switch (db.readyState) {
    case 0:
      console.log('Mongoose state: disconnected');
      break;
    case 1:
      console.log('Mongoose state: connected');
      break;
    case 2:
      console.log('Mongoose state: connecting');
      break;
    case 3:
      console.log('Mongoose state: disconnecting');
      break;
    default:
      console.log('Strange forces are at work here...');
  }
});

var router = express.Router(); // route everyting through router
app.use('/api', router); // router sits at the /api extension
// middleware for all requests
router.use(function(req, res, next) {
  console.log('Received a request');
  next();
});

router.get('/', function(req, res) {
  res.json({
    message: 'Connected to GServ API'
  });
});

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);


// Get that server kickin
app.listen(port, function() {
  console.log('GServ listening on port ' + port)
});
