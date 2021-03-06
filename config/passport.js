/**
 * Created by urielbertoche on 12/24/2015.
 */

// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport, env) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id)
    .exec(function(err, user) {
      done(err, user);
    });
  });

  // code for login (use('local-login', new LocalStategy))
  // code for signup (use('local-signup', new LocalStategy))
  passport.use(new LocalStrategy(User.authenticate()));

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  var clientID,
      clientSecret,
      callbackURL;

  if (env == "prod") {
    clientID = configAuth.facebookAuth.clientID;
    clientSecret = configAuth.facebookAuth.clientSecret;
    callbackURL = configAuth.facebookAuth.callbackURL;
  } else {
    clientID = configAuth.facebookTestAuth.clientID;
    clientSecret = configAuth.facebookTestAuth.clientSecret;
    callbackURL = configAuth.facebookTestAuth.callbackURL;
  }

  passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : clientID,
        clientSecret    : clientSecret,
        callbackURL     : callbackURL,
        profileFields   : ['id', 'displayName', 'photos', 'email']
      },

      // facebook will send back the token and profile
      function(token, refreshToken, profile, done) {

        console.log(profile);

        // asynchronous
        process.nextTick(function() {

          // find the user in the database based on their facebook id
          User.findOne({ 'facebookId' : profile.id }).exec(function(err, user) {

            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
              return done(err);

            // if the user is found, then log them in
            if (user) {
              if (user.token != token) {
                user.token = token;
                user.save(function (err) {
                  if (err) throw err;
                });
              }

              return done(null, user); // user found, return that user
            } else {
              // if there is no user found with that facebook id, create them
              var newUser            = new User();

              // set all of the facebook information in our user model
              newUser.facebookId    = profile.id; // set the users facebook id
              newUser.token = token; // we will save the token that facebook provides to the user
              newUser.name  = profile.displayName; // look at the passport user profile to see how names are returned
              newUser.username = profile.emails[0].value;
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              newUser.photo = "https://graph.facebook.com/" + profile.id + "/picture?type=large"; // profile.photos[0].value;
              newUser.photo_thumb = profile.photos[0].value;

              // save our user to the database
              newUser.save(function(err) {
                if (err)
                  throw err;

                // if successful, return the new user
                return done(null, newUser);
              });
            }

          });
        });

      }));

};