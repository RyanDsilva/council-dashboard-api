const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  rollNo: String,
  display: String,
  googleId: String,
  googleToken: String,
  year: String,
  branch: String
});

module.exports = mongoose.model('User', UserSchema);
