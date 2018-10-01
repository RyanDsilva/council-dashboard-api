
const Event = require('../models/event');
const Council = require('../models/council');
const User = require('../models/user');

let eventController = {};

eventController.create = (req,res) => {
    let event = new Event({ name: req.body.name });
    event.description = req.body.description;



};

eventController.edit = (req,res) => {

};

eventController.register = (req,res) => {
    
};

eventController.find = (req,res) => {

};

eventController.findAll = (req,res) => {

};

eventController.delete = (req,res) => {
    Event.findByIdAndRemove(req.params.id, err => {
        if (err) {
          //TODO: Handle Errors
        } else {
          res.redirect('/');
        }
      });

};