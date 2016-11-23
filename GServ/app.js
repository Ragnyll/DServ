var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Beer = require('../models/beer');
var port = process.env.PORT || 3000; // use environment port or just default to 3000

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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
router.use(function(req, res, next){
  console.log('Received a request');
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'Connected to GServ API'});
});

var beersRoute = router.route('/beers');
beersRoute.post(function(req, res) {
  console.log('in the beers route. trying to get all the users');

  var beer = new Beer();
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;
  console.log('saved beer variables');
  beer.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({message: 'success!', data: beer});
  });
});

// Get that server kickin
app.listen(port, function() {
  console.log('GServ listening on port ' + port)
});
