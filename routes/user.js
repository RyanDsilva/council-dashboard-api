const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/userController');

Router.post('/user/create', (req, res) => {
  Controller.addUser(req, res);
});

Router.get('/user/:rollNo', (req, res) => {
  Controller.findUser(req, res);
});

Router.get('/users/all', (req, res) => {
  Controller.fetchAll(req, res);
});

Router.delete('/user/:rollNo/delete', (req, res) => {
  Controller.deleteUser(req, res);
});

module.exports = Router;
