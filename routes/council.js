const express = require('express');
const Router = express.Router();
const passport = require('passport');
const Controller = require('../controllers/councilController');
const middleware = require('../middleware/index');

Router.post(
  '/council/login',
  passport.authenticate('local', {
    failureRedirect: '/council/login'
  }),
  (req, res) => {
    res.send(req.user);
  }
);

Router.post('/council/register', (req, res) => {
  Controller.register(req, res);
});

Router.get('council/logout', (req, res) => {
  Controller.logout(req, res);
});

Router.get('/council/:id/dashboard', (req, res) => {
  Controller.find(req, res);
});

Router.get('/council/:id/edit', (req, res) => {
  Controller.find(req, res);
});

Router.put('/council/:id/edit', (req, res) => {
  Controller.edit(req, res);
});

Router.get('/council/:id/members/add', (req, res) => {
  Controller.find(req, res);
});

Router.put('/council/:id/members/add', (req, res) => {
  Controller.addMember(req, res);
});

Router.put('/council/:cid/members/:mid/remove', (req, res) => {
  Controller.removeMember(req, res);
});

Router.get('/council/:id/delete', (req, res) => {
  Controller.find(req, res);
});

Router.delete('/council/:id/delete', (req, res) => {
  Controller.delete(req, res);
});

module.exports = Router;
