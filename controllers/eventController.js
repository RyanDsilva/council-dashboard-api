const Event = require('../models/event');
const User = require('../models/user');

let EventController = {};

EventController.create = (req, res) => {
  Event.create({ name: req.body.name }, (err, event) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/event/all');
    } else {
      event.description = req.body.description;
      event.date = req.body.date;
      event.image = req.body.image;
      event.type = req.body.type;
      event.duration = req.body.duration;
      event.heldBy = req.user._id;
      event.registrations = [];
      event.save();
      req.flash('Event Created Successflly!');
      res.redirect('/event/all');
    }
  });
};

EventController.search = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/event/all');
    } else {
      res.send(event);
    }
  });
};

EventController.fetchAll = (req, res) => {
  Event.find((err, events) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/');
    } else {
      res.send(events);
    }
  });
};

EventController.edit = (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body.event, (err, event) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/event/' + req.params.id);
    } else {
      req.flash('success', 'Event Updated successfully!');
      res.redirect('/event/' + req.params.id);
    }
  });
};

EventController.register = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/event/' + req.params.id);
    } else {
      User.findById(req.user.id, (err, user) => {
        if (err) {
          console.log(err);
          req.flash('error', 'An Error Occured! Please try again!');
          res.redirect('/event/' + req.params.id);
        } else {
          event.registrations.push(user);
          event.save();
          req.flash('success', 'Registered successfully!');
          res.redirect('/event/' + req.params.id);
        }
      });
    }
  });
};

EventController.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
      req.flash('error', 'An Error Occured! Please try again!');
      res.redirect('/event/' + req.params.id);
    } else {
      req.flash('success', 'Event Deleted successfully!');
      res.redirect('/event/all');
    }
  });
};

module.exports = EventController;
