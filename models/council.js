var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var CouncilSchema = new mongoose.Schema({
  username: String,
  name: String,
  description: String,
  password: String,
  isAdmin: Boolean,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

CouncilSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Council', CouncilSchema);
