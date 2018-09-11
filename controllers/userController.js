const User = require('../models/user');

let UserController = {};

UserController.logout = (req, res) => {
  req.logout();
};

UserController.find = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
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
      } else {
        res.send(user);
      }
    }
  );
};

UserController.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      res.send('Deleted');
    }
  });
};

module.exports = UserController;
