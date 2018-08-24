const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/eventController');
const middleware = require('../middleware/index');

Router.post('/event/create', middleware.isAuthenticated, (req, res) => {
  Controller.create(req, res);
});

Router.post('/event/:id/register', middleware.isAuthenticated, (req, res) => {
  Controller.register(req, res);
});

Router.get('/event/all', (req, res) => {
  Controller.fetchAll(req, res);
});

Router.get('/event/:id', (req, res) => {
  Controller.search(req, res);
});

Router.get('/event/:id/edit', middleware.isEventOwner, (req, res) => {
  Controller.search(req, res);
});

Router.put('/event/:id/edit', middleware.isEventOwner, (req, res) => {
  Controller.edit(req, res);
});

Router.delete('/event/:id/delete', middleware.isAdmin, (req, res) => {
  Controller.delete(req, res);
});

module.exports = Router;
