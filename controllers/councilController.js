const passport = require('passport');
const Council = require('../models/council');
const User = require('../models/user');

var CouncilController = {};

CouncilController.register = (req, res) => {
  var council = new Council({ name: req.body.name });
  council.description = req.body.description;
  council.isAdmin = false;
  Council.register(council, req.body.password, (err, council) => {
    if (err) {
      //TODO: Handle the Error
    } else {
      passport.authenticate('local')(req, res, () => {
        //TODO: Add Flash Message for Success
        res.redirect('/council/' + council._id + '/dashboard');
      });
    }
  });
};

CouncilController.login = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/council/' + council._id + '/dashboard',
    failureRedirect: '/council/login'
    //TODO: Add Failure Flash
  });
};

CouncilController.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

CouncilController.find = (req, res) => {
  Council.findById(req.params.id)
    .populate('users')
    .exec((err, council) => {
      if (err) {
        //TODO: Handle Errors
      } else {
        res.send(council);
      }
    });
};

CouncilController.edit = (req, res) => {
  Council.findByIdAndUpdate(req.params.id, req.body.council, (err, council) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      res.send(council);
      res.redirect('/council/' + council._id + '/dashboard');
    }
  });
};

CouncilController.delete = (req, res) => {
  Council.findByIdAndRemove(req.params.id, err => {
    if (err) {
      //TODO: Handle Errors
    } else {
      res.redirect('/');
    }
  });
};

CouncilController.addMember = (req, res) => {
  Council.findById(req.params.id, (err, council) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      User.find({ rollno: req.body.rollno }, (err, user) => {
        if (err) {
          //TODO: Handle Errors
        } else {
          council.members.push(user);
          council.save();
          res.redirect('/council/' + council._id + '/dashboard');
        }
      });
    }
  });
};

CouncilController.removeMember = (req, res) => {
  Council.findByIdAndUpdate(req.params.cid, (err, council) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      User.findById(req.params.mid, (err, user) => {
        if (err) {
          //TODO: Handle Errors
        } else {
          council.members.id(user._id).remove();
          res.redirect('/council/' + council._id + '/dashboard');
        }
      });
    }
  });
};

module.exports = CouncilController;
