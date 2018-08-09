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
      //Handle the error
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

module.exports = CouncilController;
