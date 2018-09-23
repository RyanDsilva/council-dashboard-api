const Event = require('../models/event');
const User = require('../models/user');

let EventController = {};

EventController.create = (req, res) => {
  Event.create({ name: req.body.name }, (err, event) => {
    if (err) {
      res.status(500).json(err);
    } else {
      event.description = req.body.description;
      event.date = req.body.date;
      event.type = req.body.type;
      event.duration = req.body.duration;
      event.heldBy = req.body.host;
      event.save();
      res.status(200).json(event);
    }
  });
};

EventController.search = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(event);
    }
  });
};

EventController.fetchAll = (req, res) => {
  Event.find((err, events) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(500).json(events);
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
        res.status(500).json(err);
      } else {
        res.status(200).json(event);
      }
    }
  );
};

EventController.register = (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(500).json(err);
    } else {
      User.findOne({ rollNo: req.body.rollNo }, (err, user) => {
        if (err) {
          res.status(404).json(err);
        } else {
          event.registrations.push(user);
          event.save();
          res.status(200).json(event);
        }
      });
    }
  });
};

EventController.delete = (req, res) => {
  Event.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json('Deleted Event');
    }
  });
};

module.exports = EventController;
