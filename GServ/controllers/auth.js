var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../../models/user');
var BearerStrategy = require('passport-http-bearer').Strategy;
var Token = require('../../models/token');

passport.use(new BasicStrategy(
  function(username ,password, callback) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback(null, false);
      }
      user.verifyPassword(password, function(err, isMatch) {
        if (err) {
          return callback(err);
        }
        if (!isMatch) {
          return callback(null, false);
        }
        return callback(null, user);
      });
    });
  }
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
