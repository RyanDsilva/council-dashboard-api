const passport = require('passport');
const Council = require('../models/council');
const User = require('../models/user');

let CouncilController = {};

CouncilController.register = (req, res) => {
  var council = new Council({ username: req.body.username });
  council.description = req.body.description;
  council.isAdmin = false;
  Council.register(council, req.body.password, (err, council) => {
    if (err) {
      console.log(err.message);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/council/register');
    } else {
      passport.authenticate('local')(req, res, () => {
        req.flash('success', 'You have successfully logged in!');
        res.redirect('/council/' + council._id + '/dashboard');
      });
    }
  });
};

CouncilController.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out!');
  res.redirect('/');
};

CouncilController.find = (req, res) => {
  Council.findById(req.params.id)
    .populate('members')
    .exec((err, council) => {
      if (err) {
        console.log(err.message);
        req.flash('error', 'An Error Occured! Please try again!');
        res.redirect('/event/all');
      } else {
        res.send(council);
      }
    });
};

CouncilController.edit = (req, res) => {
  Council.findByIdAndUpdate(req.params.id, req.body.council, (err, council) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/council/' + req.user._id + '/dashboard');
    } else {
      req.flash('success', 'Updated successfully');
      res.redirect('/council/' + req.params.id + '/dashboard');
    }
  });
};

CouncilController.delete = (req, res) => {
  Council.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err.message);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/council/' + req.params.id + '/dashboard');
    } else {
      req.flash('success', 'Successfully Deleted!');
      res.redirect('/event/all');
    }
  });
};

CouncilController.addMember = (req, res) => {
  Council.findById(req.params.id, (err, council) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/council/' + req.params.id + '/dashboard');
    } else {
      User.findOne({ rollNo: req.body.rollNo }, (err, user) => {
        if (err) {
          console.log(err);
          req.flash('error', 'An Error Occured! Please try again!');
          res.redirect('/council/' + req.params.id + '/dashboard');
        } else {
          council.members.push(user);
          council.save();
          req.flash('success', 'Member added successfully!');
          res.redirect('/council/' + req.params.id + '/dashboard');
        }
      });
    }
  });
};

CouncilController.removeMember = (req, res) => {
  Council.findById(req.params.cid, (err, council) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/council/' + req.params.cid + '/dashboard');
    } else {
      User.findById(req.params.mid, (err, user) => {
        if (err) {
          console.log(err);
          req.flash('error', 'An Error Occured! Please try again!');
          res.redirect('/council/' + req.params.cid + '/dashboard');
        } else {
          council.members.pull(user._id);
          council.save();
          req.flash('success', 'Member removed successfully!');
          res.redirect('/council/' + req.params.cid + '/dashboard');
        }
      });
    }
  });
};

module.exports = CouncilController;
