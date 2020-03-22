const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: String,
});

module.exports = mongoose.model('Rooms', RoomSchema);