const express = require('express');
const router = express.Router();
const Room = require('../models/Room');


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

module.exports = router;
