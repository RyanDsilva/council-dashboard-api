const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const keys = require('../keys');

const GoogleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || keys.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || keys.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://council.netlify.com/auth/google/callback'
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
