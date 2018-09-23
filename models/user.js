const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  rollNo: { type: Number, index: { unique: true } },
  name: String,
  branch: String,
  year: String,
  email: String,
  phone: String
});

module.exports = mongoose.model('User', UserSchema);
