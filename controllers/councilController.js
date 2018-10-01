const passport = require('passport');
const Council = require('../models/council');
const User = require('../models/user');

let CouncilController = {};

CouncilController.register = (req, res) => {
  let council = new Council({ username: req.body.username });
  council.description = req.body.description;
  council.name = req.body.name;
  council.isAdmin = false;
  Council.register(council, req.body.password, (err, council) => {
    if (err) {
      res.status(403).json(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send(req.user);
      });
    }
  });
};

CouncilController.logout = (req, res) => {
  req.logout();
  res.status(200).json('Logged Out!');
};

CouncilController.find = (req, res) => {
  Council.findById(req.params.id)
    .populate('members')
    .populate('events')
    .exec((err, council) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(council);
      }
    });
};

CouncilController.edit = (req, res) => {
  Council.findByIdAndUpdate(
    req.params.id,
    req.body.council,
    { new: true },
    (err, council) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(council);
      }
    }
  );
};

CouncilController.delete = (req, res) => {
  Council.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json('Deleted Council!');
    }
  });
};

CouncilController.addMember = (req, res) => {
  Council.findById(req.params.id, (err, council) => {
    if (err) {
      res.status(500).json(err);
    } else {
      User.findOne({ rollNo: req.body.rollNo }, (err, user) => {
        if (err) {
          res.status(404).json(err);
        } else {
          council.members.push(user);
          council.save();
          res.status(200).json(council);
        }
      });
    }
  });
};

CouncilController.removeMember = (req, res) => {
  Council.findById(req.params.id, (err, council) => {
    if (err) {
      res.status(500).json(err);
    } else {
      User.findOne({ rollNo: req.body.rollNo }, (err, user) => {
        if (err) {
          res.status(403).json(err);
        } else {
          council.members.pull(user._id);
          council.save();
          res.status(200).json(council);
        }
      });
    }
  });
};

module.exports = CouncilController;
