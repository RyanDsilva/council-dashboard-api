const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const LocalStrategy = require('passport-local');
const GoogleOauth = require('./middleware/oauth');
const flash = require('connect-flash');
const keys = require('./keys');

//Import Routes
const UserRoutes = require('./routes/user');
const CouncilRoutes = require('./routes/council');
const EventRoutes = require('./routes/event');

//Import Schemas
const User = require('./models/user');
const Council = require('./models/council');

const app = express();

//Middleware Setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(flash());

//Variables
const port = process.env.PORT || 3000;
const db = process.env.DATABASEURL || 'mongodb://localhost/councildashboard';
const address = process.env.IP || '127.0.0.1';

//Database
mongoose.connect(db);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || keys.COOKIE_KEY]
  })
);

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

passport.use(GoogleOauth);

//Routes
app.use(UserRoutes);
app.use(CouncilRoutes);
app.use(EventRoutes);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, address, () => {
  console.log('Council Dashboard API listening on port ' + port);
});
