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
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  let resultArray = [];
  const rooms = await Room.find();

  let startDateDate = new Date(startDate);
  let endDateDate = new Date(endDate);

  startDateDate.setHours(0, 0, 1, 0);
  endDateDate.setHours(23, 59,59,0);

  for (const room of rooms) {
      const reservations = await Reservation.find({ $or: [{"startDate": {"$lte": startDateDate}, "endDate": {"$gte": startDateDate}},
          {"startDate": {"$lte": endDateDate}, "endDate": {"$gte": endDateDate}},
          {"startDate": {"$gte": startDateDate}, "endDate": {"$lte": endDateDate}},
        ]}).where('room').eq(room.id);

      if (reservations.length === 0){
        resultArray.push(room);
      }
  }
  res.json(resultArray);
});

module.exports = router;
