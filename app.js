const express = require('express');
const bodyParser = require('body-parser');
const sanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const flash = require('connect-flash');

//Import Routes
const UserRoutes = require('./routes/user');
const CouncilRoutes = require('./routes/council');
const EventRoutes = require('./routes/event');

//Import Schemas
const User = require('./models/user');
const Council = require('./models/council');

const app = express();

//Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sanitizer());
app.use(methodOverride('_method'));
app.use(
  require('express-session')({
    secret: 'Common Council Dashboard',
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors());
app.use(flash());

//Variables
const port = process.env.PORT || 3000;
const db = process.env.DATABASEURL || 'mongodb://localhost/councildashboard';
const address = process.env.IP || '127.0.0.1';

//Database
mongoose.connect(db);

//Auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Council.authenticate()));
passport.serializeUser(Council.serializeUser());
passport.deserializeUser(Council.deserializeUser());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID ||
        '846047337135-leg0s7jqn8fk4djkvaorg3d4kr1lsjmt.apps.googleusercontent.com',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || 'w3GaOIc7VXMLbLtNSNjlrIN-',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ googleId: profile.id }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            let newUser = new User();
            newUser.googleId = profile.id;
            newUser.googleToken = accessToken;
            newUser.name = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.display = profile.photos[0].value;

            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

//Routes
app.use(UserRoutes);
app.use(CouncilRoutes);
//app.use(EventRoutes);

app.listen(port, address, () => {
  console.log('Council Dashboard API listening on port ' + port);
});
