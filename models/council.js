var mongoose = require('mongoose');

var CouncilSchema = new mongoose.Schema({
    name: String,
    description: String,
    password: String,
    isAdmin: Boolean,
    members: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
     ],
     events: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Events"
      },
   ] 
});

module.exports = mongoose.model('Council', CouncilSchema);