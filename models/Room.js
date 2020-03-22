const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: Number,
    Price: Number
});

module.exports = mongoose.model('Rooms', RoomSchema);