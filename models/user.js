const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  display: String,
  googleId: String,
  googleToken: String,
  year: String,
  branch: String,
  belongsto: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Council'
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
