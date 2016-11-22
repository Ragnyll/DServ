var express = require('express');
var mongoose = require('mongoose');
var Users = require('../models/users');
var port = process.env.PORT || 3000; // use environment port or just default to 3000
var app = express();
var router = express.Router(); // route everyting through router

// connect to mongodb. if it doesnt connecct after 10 seconds just quit
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

app.use('/api', router); // router sits at the /api extension

router.get('/', function(req, res) {
  res.json({message: 'Connecting to GServ API'});
});

router.get('/users', function(req, res) {
  console.log('in the users route. trying to get all the users');
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  })
});
usersRoute.post(function(req, res) {
  var user = new User();

  user.name = 'jim';
  user.password = 'duck';
  user.other = 'no';

  user.save(function(err) {
    if (err) {
      res.send(err);
      console.log('problem saving the result of the POST request');
    }
    res.json({message: 'your user was created', data: user });
  });
});

// Get that server kickin
app.listen(port, function() {
  console.log('GServ listening on port ' + port)
});
