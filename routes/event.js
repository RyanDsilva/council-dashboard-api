const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/eventController');

Router.post('/event/create', (req, res) => {
  Controller.create(req, res);
});

Router.post('/event/:id/register', (req, res) => {
  Controller.register(req, res);
});

Router.get('/event/all', (req, res) => {
  Controller.fetchAll(req, res);
});

Router.get('/event/:id', (req, res) => {
  Controller.search(req, res);
});

Router.get('/event/:id/edit', (req, res) => {
  Controller.search(req, res);
});

Router.put('/event/:id/edit', (req, res) => {
  Controller.edit(req, res);
});

Router.post('/event/:id/delete', (req, res) => {
  Controller.delete(req, res);
});

module.exports = Router;
