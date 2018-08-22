const express = require('express');
const Router = express.Router();
const passport = require('passport');
const Controller = require('../controllers/userController');

Router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

Router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/events/all',
    failureRedirect: '/auth/google'
  })
);

Router.get('/user/edit/:userid', (req, res) => {
  Controller.find(req, res);
});

Router.put('/user/edit/:userid', (req, res) => {
  Controller.edit(req, res);
});

Router.delete('/user/delete/:userid', (req, res) => {
  Controller.delete(req, res);
});

Router.get('/user/logout', (req, res) => {
  Controller.logout(req, res);
});

module.exports = Router;
