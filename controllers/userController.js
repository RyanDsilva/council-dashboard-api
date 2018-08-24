const User = require('../models/user');

let UserController = {};

UserController.logout = (req, res) => {
  req.logout();
  res.send('Logged Out');
  res.redirect('/');
};

UserController.find = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/');
    } else {
      res.send(user);
    }
  });
};

UserController.edit = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user, (err, user) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/user/' + user._id + '/dashboard');
    } else {
      req.flash('success', 'User Updated Successfully!');
      res.redirect('/user/' + user._id + '/dashboard');
    }
  });
};

UserController.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/user/' + user._id + '/dashboard');
    } else {
      req.flash('success', 'User Deleted Successfully!');
      res.redirect('/');
    }
  });
};

module.exports = UserController;
