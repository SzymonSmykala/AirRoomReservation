const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bcrypt = require('bcryptjs');

router.post('/', async(request, response) => {

  try {
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    const user = new User(request.body);
    const result = await user.save();
    response.send({message: 'Success'});
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});

router.post('/login', async(request, response) => {
  try {
    var user = await User.findOne({ username: request.body.username }).exec();
    if (!user) {
      return response.status(400).send({ message: 'The username does not exist' });
    }
    if (!Bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(400).send({ message: 'The password is invalid' });
    }
    response.send({ message: 'The username and password combination is correct!' });
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/', async(request, response) => {

  try {
    const users = await User.find();
    response.json(users);
  } catch (error) {
    response.json(error);
  }

});

module.exports = router;
