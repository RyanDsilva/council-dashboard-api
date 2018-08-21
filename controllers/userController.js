const passport = require('passport');
const User = require('../models/user');

let UserController = {};

UserController.register = (req, res) => {
  var newUser = new User({ username: req.body.username });
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.phone = req.body.phone;
  newUser.year = req.body.year;
  newUser.branch = req.body.branch;
  //console.log(newUser);
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      //TODO: Handle the Error
      console.log(err.message);
    } else {
      passport.authenticate('local')(req, res, () => {
        //TODO: Add Flash Message for Success
        console.log(req.user);
        res.send(req.user);
      });
    }
  });
};

UserController.logout = (req, res) => {
  req.logout();
  res.send('Logged Out');
  res.redirect('/');
};

UserController.find = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      res.send(user);
    }
  });
};

UserController.edit = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    if (err) {
      console.log(err);
      //TODO: Handle Errors
    } else {
      res.send(user);
    }
  });
};

UserController.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      //TODO: Handle Errors
    } else {
      res.send('Deleted');
    }
  });
};

module.exports = UserController;
