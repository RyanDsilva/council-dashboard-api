const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/councilController');

Router.post('/council/login', (req, res) => {
  Controller.login(req, res);
});

Router.post('/council/register', (req, res) => {
  Controller.register(req, res);
});

Router.get('/logout', (req, res) => {
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

Router.post('/council/:id/members/add', (req, res) => {
  Controller.addMember(req, res);
});

Router.delete('/council/:cid/members/:mid', (req, res) => {
  Controller.removeMember(req, res);
});

Router.get('/council/:id/delete', (req, res) => {
  Controller.find(req, res);
});

Router.delete('/council/:id/delete', (req, res) => {
  Controller.delete(req, res);
});

module.exports = Router;
