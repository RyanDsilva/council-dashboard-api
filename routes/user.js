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
  }),
  (req, res) => {
    res.send(req.user);
  }
);

Router.get('/user/:id/edit', (req, res) => {
  Controller.find(req, res);
});

Router.get('/user/:id/dashboard', (req, res) => {
  Controller.find(req, res);
});

Router.put('/user/:id/edit', (req, res) => {
  Controller.edit(req, res);
});

Router.delete('/user/:id/delete', (req, res) => {
  Controller.delete(req, res);
});

Router.get('/user/logout', (req, res) => {
  Controller.logout(req, res);
});

module.exports = Router;
