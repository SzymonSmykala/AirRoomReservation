const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.post('/', async(req, res) => {
  try {
    let reservation = new Reservation(req.body);

    if (await checkRoomAvailability(reservation.startDate, reservation.endDate, reservation.room))  {
      reservation.status = "Pending";
      reservation.startDate.setHours(0, 0, 1, 0);
      reservation.endDate.setHours(23, 59, 59, 0);
      let response = await reservation.save();
      res.send(response);
    }else{
      res.status(403).send('Room is already booked!')
    }

  } catch (error) {
    console.log(error);
    res.json(error);
  }

});

router.patch('/', async(req, res) => {
  try {
    const reservation = new Reservation(req.body);

    if (await checkRoomAvailabilityForUpdate(reservation.startDate, reservation.endDate, reservation.room, reservation._id)){
        const response = await Reservation.findByIdAndUpdate(reservation.id, reservation);
        res.json(response);
    }else{
      res.status(403).send('Room is already booked!')
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }

});

router.get('/', async(req, res) => {

  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.json(error);
  }

});

router.get('/user/:userId', async(req, res) => {
  try {
    const reservations = await Reservation.find().where('user').eq(req.params.userId);
    res.json(reservations);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:reservationId', async(req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:reservationId', async(req, res) => {
  try {
    const reservation = await Reservation.findByIdAndRemove(req.params.reservationId);
    res.json(reservation);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

async function checkRoomAvailability(startDateDate, endDateDate, roomId) {
  const reservations = await Reservation.find({
    $or: [{"startDate": {"$lte": startDateDate}, "endDate": {"$gte": startDateDate}},
      {"startDate": {"$lte": endDateDate}, "endDate": {"$gte": endDateDate}},
      {"startDate": {"$gte": startDateDate}, "endDate": {"$lte": endDateDate}},
    ]
  }).where('room').eq(roomId);

  return reservations.length === 0;

}

async function checkRoomAvailabilityForUpdate(startDateDate, endDateDate, roomId, reservationId) {
  const reservations = await Reservation.find({
    $or: [{"startDate": {"$lte": startDateDate}, "endDate": {"$gte": startDateDate}},
      {"startDate": {"$lte": endDateDate}, "endDate": {"$gte": endDateDate}},
      {"startDate": {"$gte": startDateDate}, "endDate": {"$lte": endDateDate}},
    ]
  }).where('room').eq(roomId);

  if (reservations.length === 0){
    return true;
  }
  return reservations.length === 1 && reservations[0]._id.equals(reservationId);
}

module.exports = router;
