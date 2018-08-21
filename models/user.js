const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  year: String,
  password: String,
  branch: String,
  belongsto: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Council'
    }
  }
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
