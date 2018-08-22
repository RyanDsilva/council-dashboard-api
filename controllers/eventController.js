const Event = require('../models/event');
const User = require('../models/user');

let eventController = {};

eventController.create = (req, res) => {
  var event = new Event({ name: req.body.name });
  event.description = req.body.description;
  event.date = req.body.date;
  event.image = req.body.image;
  event.type = req.body.type;
  event.duration = req.body.duration;
  event.heldBy = req.user.id;
  event.registrations = [];
  event.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/event/all');
    }
  });
};

eventController.search = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    } else {
      res.send(event);
    }
  });
};

eventController.fetchAll = (req, res) => {
  Event.find((err, events) => {
    if (err) {
      console.log(err);
    } else {
      res.send(events);
    }
  });
};

eventController.edit = (req, res) => {
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

eventController.register = (req, res) => {
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

eventController.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/event/all');
    }
  });
};

module.exports = eventController;
