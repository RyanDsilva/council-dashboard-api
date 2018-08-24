const Event = require('../models/event');

let Authorization = {};

Authorization.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('user/login');
};
Authorization.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    } else {
      req.flash('error', 'You do not have the permission to do that!');
      res.redirect('back');
    }
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('council/login');
  }
};
Authorization.isEventOwner = (req, res, next) => {
  if (req.isAuthenticated()) {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        req.flash('error', 'An Error Occurred');
        res.redirect('event/all');
      } else {
        if (event.heldBy.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that!');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('council/login');
  }
};

module.exports = Authorization;
