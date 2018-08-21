
const Event = require('../models/event');
const Council = require('../models/council');
const User = require('../models/user');

let eventController = {};

eventController.add = (req,res) => {
    var event = new Event({ name: req.body.name });
    event.description = req.body.description;



};

eventController.edit = (req,res) => {

};

eventController.register = (req,res) => {
    var event = new Event({ name: req.body.name });
  event.register=
  council.isAdmin = false;
  Council.register(council, req.body.password, (err, council) => {
    if (err) {
      //TODO: Handle the Error
    } else {
      passport.authenticate('local')(req, res, () => {
        //TODO: Add Flash Message for Success
        res.redirect('/council/' + council._id + '/dashboard');
      });
    }
  });

};

eventController.displayEvent = (req,res) => {

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