const Event = require('../models/event');
const Council = require('../models/council');
const User = require('../models/user');
const transporter = require('../middleware/mailer');

let EventController = {};

EventController.create = (req, res) => {
  Council.findById(req.body.event.heldBy, (err, council) => {
    if (err) {
      res.status(500).json(err);
    } else {
      Event.create({ name: req.body.event.name }, (err, event) => {
        if (err) {
          res.status(500).json(err);
        } else {
          event.description = req.body.event.description;
          event.date = req.body.event.date;
          event.type = req.body.event.type;
          event.duration = req.body.event.duration;
          event.heldBy = req.body.event.heldBy;
          event.save();
          council.events.push(event);
          council.save();
          res.status(200).json(event);
        }
      });
    }
  });
};

EventController.search = (req, res) => {
  Event.findById(req.params.id)
    .populate('registrations')
    .populate('heldBy')
    .exec((err, event) => {
      if (err) {
        res.status(404).json(err);
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
      res.status(200).json(events);
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
          transporter.sendMail({
            from: 'admin@kollab.com',
            to: user.email,
            subject: 'Event Registration Complete',
            html:
              '<b>Thank you for registering for ' +
              event.name +
              '!</b> <p></p> Here are the complete event details, <br> Name: ' +
              event.name +
              '<br> Description: ' +
              event.description +
              '<br> Time and Date: ' +
              event.date +
              '</p>'
          });
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
