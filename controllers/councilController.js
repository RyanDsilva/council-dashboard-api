const passport = require('passport');
const Council = require('../models/council');
const User = require('../models/user');

let CouncilController = {};

CouncilController.register = (req, res) => {
  var council = new Council({ username: req.body.username });
  council.description = req.body.description;
  council.isAdmin = false;
  console.log(council);
  Council.register(council, req.body.password, (err, council) => {
    if (err) {
      //TODO: Handle the Error
      console.log(err.message);
    } else {
      passport.authenticate('local')(req, res, () => {
        //TODO: Add Flash Message for Success
        res.send(council);
      });
    }
  });
};

CouncilController.logout = (req, res) => {
  req.logout();
  res.send('Logged Out');
  res.redirect('/');
};

CouncilController.find = (req, res) => {
  Council.findById(req.params.id)
    .populate('members')
    .exec((err, council) => {
      if (err) {
        //TODO: Handle Errors
      } else {
        res.send(council);
      }
    });
};

CouncilController.edit = (req, res) => {
  Council.findByIdAndUpdate(req.params.id, req.body.council, (err, council) => {
    if (err) {
      console.log(err);
      //TODO: Handle Errors
    } else {
      res.send(council);
    }
  });
};

CouncilController.delete = (req, res) => {
  Council.findByIdAndRemove(req.params.id, err => {
    if (err) {
      //TODO: Handle Errors
    } else {
      res.send('Deleted');
    }
  });
};

CouncilController.addMember = (req, res) => {
  Council.findById(req.params.id, (err, council) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      User.findOne({ rollNo: req.body.rollNo }, (err, user) => {
        if (err) {
          //TODO: Handle Errors
        } else {
          council.members.push(user);
          council.save();
          res.send(council);
        }
      });
    }
  });
};

CouncilController.removeMember = (req, res) => {
  Council.findById(req.params.cid, (err, council) => {
    if (err) {
      //TODO: Handle Errors
    } else {
      User.findById(req.params.mid, (err, user) => {
        if (err) {
          //TODO: Handle Errors
        } else {
          council.members.pull(user._id);
          council.save();
          res.send(council);
        }
      });
    }
  });
};

module.exports = CouncilController;
