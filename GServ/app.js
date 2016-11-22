var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000; // use environment port or just default to 3000
var app = express();

var router = express.Router(); // route everyting through router
app.use('/api', router); // router sits at the /api extension

router.get('/', function(req, res) {
  res.json({message: 'Connecting to GServ'});
});


// Get that server kickin
app.listen(port, function() {
  console.log('GServ listening on port ' + port)
});
