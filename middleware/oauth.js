const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

const GoogleOauth = new GoogleStrategy(
  {
    clientID:
      process.env.GOOGLE_CLIENT_ID ||
      '846047337135-leg0s7jqn8fk4djkvaorg3d4kr1lsjmt.apps.googleusercontent.com',
    clientSecret:
      process.env.GOOGLE_CLIENT_SECRET || 'w3GaOIc7VXMLbLtNSNjlrIN-',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          User.create({ googleId: profile.id }, (err, newUser) => {
            if (err) {
              console.log(err);
            } else {
              newUser.googleToken = accessToken;
              newUser.name = profile.displayName;
              newUser.email = profile.emails[0].value;
              newUser.display = profile.photos[0].value;
              newUser.phone = '9876543210';
              newUser.year = 'TE';
              newUser.branch = 'IT';
              newUser.rollNo = '9999';
              //Saving to DB
              newUser.save(function(err) {
                if (err) {
                  console.log(err);
                }
                return done(null, newUser);
              });
            }
          });
        }
      });
    });
  }
);

module.exports = GoogleOauth;
