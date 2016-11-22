var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000; // use environment port or just default to 3000
var app = express();
var router = express.Router(); // route everyting through router

// connect to mongodb. if it doesnt connecct after 10 seconds just quit
// TODO: add a keep alive to prevent connection closed
mongoose.connect('mongodb://localhost:27017/beerlocker', function(err) {
  if (err) throw err;
});
// make sure that mongoose was able to connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose ready state:');
  console.log(db.readyState);
});

app.use('/api', router); // router sits at the /api extension

router.get('/', function(req, res) {
  res.json({message: 'Connecting to GServ'});
});


// Get that server kickin
app.listen(port, function() {
  console.log('GServ listening on port ' + port)
});
