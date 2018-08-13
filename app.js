const express = require('express');
const bodyParser = require('body-parser');
const sanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local');
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
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(Council.authenticate()));
//passport.serializeUser(User.serializeUser());
passport.serializeUser(Council.serializeUser());
//passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(Council.deserializeUser());

//Routes
//app.use(UserRoutes);
app.use(CouncilRoutes);
//app.use(EventRoutes);

app.listen(port, address, () => {
  console.log('Council Dashboard API listening on port ' + port);
});
