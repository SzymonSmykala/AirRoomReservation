const mongoose = require('mongoose');

const Reservation = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status:{
    type: String
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true},

});

module.exports = mongoose.model('Reservation', Reservation);
