const express = require('express');
const Router = express.Router();
const Event = require('../models/event');
const Controller = require('../controllers/eventController');

Router.post('/event/create', (req, res) => {
    Controller.create(req, res);
});

Router.post('/event/register', (req, res) => {
    Controller.register(req, res);
});

Router.get('/event/all', (req, res) => {
    Controller.findAll(req, res);
});

Router.get('/event/:id', (req, res) => {
    Controller.find(req, res);
});

Router.get('/event/edit/:id', (req, res) => {
    Controller.find(req, res);
});

Router.put('/event/edit/:id', (req, res) => {
    Controller.edit(req, res);
});

Router.post('/event/delete/:id', (req, res) => {
    Controller.delete(req, res);
});

module.exports = Router;