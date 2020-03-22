const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: String,
    costPerDay: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rooms', RoomSchema);