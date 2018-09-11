const Event = require('../models/event');
const User = require('../models/user');

let EventController = {};

EventController.create = (req, res) => {
  Event.create({ name: req.body.name }, (err, event) => {
    if (err) {
      console.log(err);
    } else {
      event.description = req.body.description;
      event.date = req.body.date;
      //event.image = req.body.image;
      event.type = req.body.type;
      event.duration = req.body.duration;
      //event.heldBy = req.body.host;
      event.registrations = [];
      event.save();
      res.send(event);
    }
  });
};

EventController.search = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    } else {
      res.send(event);
    }
  });
};

EventController.fetchAll = (req, res) => {
  Event.find((err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.send(events);
    }
  });
};

EventController.edit = (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body.event,
    { new: true },
    (err, event) => {
      if (err) {
        console.log(err);
      } else {
        res.send(event);
      }
    }
  );
};

EventController.register = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    } else {
      User.findById(req.user.id, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          event.registrations.push(user);
          event.save();
          res.send(event);
        }
      });
    }
  });
};

EventController.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      res.send('Deleted');
    }
  });
};

module.exports = EventController;
