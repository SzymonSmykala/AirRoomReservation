const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.post('/', async(req, res) => {
  try {
    let reservation = new Reservation(req.body);
    reservation.status = "Pending";
    reservation.startDate.setHours(0, 0, 1, 0);
    reservation.endDate.setHours(23, 59, 59, 0);
    const response = await reservation.save();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }

});

router.patch('/', async(req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const response = await Reservation.updateOne(reservation);
    console.log(response);
    res.json(response);
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

module.exports = router;
