const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const Controller = require('../controllers/userController');

Router.post(
  '/user/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true
  }),
  (req, res) => {
    res.send(req.user);
    res.redirect('/event/all');
  }
);

Router.post('/user/register', (req, res) => {
  Controller.register(req, res);
});

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
