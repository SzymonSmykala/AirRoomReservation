const express = require('express');
const router = express.Router();
const app = express();
const Room = require('../models/Room');


router.get('/:roomId', async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        res.json(room);
    }catch (e) {
        res.json(e);
    }
});


router.get('/', async (req, res) =>{
    try{
        const rooms = await Room.find();
        res.json(rooms);
    }catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) => {
   const room = new Room({
        name: req.body.name,
        id: req.body.id
   });
    try {
        const savedRoom = await room.save();
        res.json(savedRoom);
    }catch (error) {
        res.json(error);
    }

});


router.delete('/roomId', async (req, res) => {
    try{
        const rooms = await Room.removeById(req.params.roomId);
        res.json(rooms);
    }catch (error) {
        res.json(error);
    }

});

router.patch('/', async (req, res) => {

    console.log("Patching");
    try{
        const room = new Room({
            name: req.body.name,
            id: req.body.id,
            _id: req.body._id
        });
        console.log(room);
        await Room.updateOne(room);

       res.json(updatedRoom);
    }catch (error) {
        res.json(error);
    }
});

module.exports = router;