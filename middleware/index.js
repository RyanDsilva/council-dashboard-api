const Event = require('../models/event');
const Council = require('../models/council');

let Authorization = {};

Authorization.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that!');
  res.redirect('/login');
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
    res.redirect('/login');
  }
};
Authorization.isEventOwner = (req, res, next) => {};

module.exports = Authorization;
