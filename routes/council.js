const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/councilController');

Router.get('/council/login', (req, res) => {
  //Display Login Page
});

Router.post('/council/login', (req, res) => {
  Controller.login(req,res);
});

Router.get('/council/register', (req, res) => {
  //Display Register Page
});

Router.post('/council/register', (req, res) => {
  Controller.register(req,res);
});

Router.get('/logout', (req,res) => {
  Controller.logout(req,res);
});

Router.get('/council/:id/dashboard', (req, res) => {
  //Display Dashboard
});

Router.get('/council/:id/edit', (req, res) => {
  //Display Edit Form
});

Router.put('/council/:id/edit', (req, res) => {
  //Submit Edit Form
});

Router.get('/council/:id/members/add', (req, res) => {
  //Display Members add Form
});

Router.post('/council/:id/members/add', (req, res) => {
  //Submit Members add Form
});

Router.delete('/council/:cid/members/:mid', (req, res) => {
  //Delete Members
});

Router.get('/council/:id/delete', (req, res) => {
  //Delete Council Confirmation
});

Router.delete('/council/:id/delete', (req, res) => {
  //Delete Council
});

module.exports = Router;
