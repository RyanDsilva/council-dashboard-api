const User = require('../models/user');

let UserController = {};

UserController.addUser = (req, res) => {
  User.create({ rollNo: req.body.rollNo }, (err, user) => {
    if (err) {
      res.status(500).json(err);
    } else {
      user.name = req.body.name;
      user.name = req.body.branch;
      user.year = req.body.year;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.save();
      res.status(200).json(user);
    }
  });
};

UserController.findUser = (req, res) => {
  User.findOne({ rollNo: req.params.rollNo }, (err, user) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(user);
    }
  });
};

UserController.deleteUser = (req, res) => {
  User.findOneAndRemove({ rollNo: req.params.rollNo }, err => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json('Deleted User!');
    }
  });
};

module.exports = UserController;
