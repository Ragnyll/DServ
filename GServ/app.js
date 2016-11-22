var express = require('express');
var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb');
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

app.listen(3000, function () {
  console.log('GServ listening on port 3000!')
})
