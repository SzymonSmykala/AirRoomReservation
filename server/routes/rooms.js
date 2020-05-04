const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');


router.get('/:roomId', async(req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.json(room);
  } catch (e) {
    res.json(e);
  }
});

router.get('/', async(req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async(req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.json(savedRoom);
  } catch (error) {
    res.json(error);
  }

});

router.delete('/:roomId', async(req, res) => {
  try {
    const rooms = await Room.findByIdAndRemove(req.params.roomId);
    res.json(rooms);
  } catch (error) {
    res.json(error);
  }

});

router.patch('/', async(req, res) => {

  try {
    const room = new Room({
      name: req.body.name,
      _id: req.body._id,
    });
    const updatedRoom = await Room.updateOne(room);

    res.json(updatedRoom);
  } catch (error) {
    res.json(error);
  }
});

router.post('/roomsForDates', async(req, res) => {
  let roomId = req.body.roomId;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  let resultArray = [];
  const rooms = await Room.find();

  let startDateDate = new Date(startDate);
  let endDateDate = new Date(endDate);

  for (const room of rooms) {
      const reservations = await Reservation.find({"startDate": {"$gte": startDateDate}, "endDate": {"$lt": endDateDate}}).where('room').eq(roomId);
      resultArray.push(reservations)
  }
  res.json(resultArray);
});

module.exports = router;
