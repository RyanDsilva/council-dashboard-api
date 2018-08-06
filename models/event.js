var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    description: String,
    image: String,
    type: String,
    duration: String,
    heldBy: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Council'
        }
    },
});

module.exports = mongoose.model('Event', EventSchema);