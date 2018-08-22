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
      //TODO: Handle Errors
    } else {
      console.log(user);
      res.send(user);
    }
  });
};

UserController.edit = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body.user,
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
        //TODO: Handle Errors
      } else {
        res.send(user);
      }
    }
  );
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
