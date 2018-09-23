const Event = require('../models/event');

let Authorization = {};

Authorization.isEventOwner = (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.status(404).json(err);
    } else {
      if (event.heldBy.id.equals(req.body.user._id)) {
        next();
      } else {
        res.status(403).json(err);
      }
    }
  });
};

module.exports = Authorization;
