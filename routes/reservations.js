const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.post('/', async (req, res) => {
    console.log("create reservation");
    try {
        const reservation = new Reservation(req.body);
        console.log("reservation created");
        console.log(reservation);
        const response = await reservation.save();
        res.json(response);
    }catch (error) {
        console.log(error);
        res.json(error);
    }

});

module.exports = router;