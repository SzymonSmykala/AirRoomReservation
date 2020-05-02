const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// router.post('/', async(request, response) => {
//
//   try {
//     request.body.password = Bcrypt.hashSync(request.body.password, 10);
//     const user = new User(request.body);
//     const result = await user.save();
//     response.send({message: 'Success'});
//   } catch (error) {
//     console.error(error);
//     response.status(500).send(error);
//   }
// });

router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({
    message : 'Signup successful',
    user : req.user
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     try {
    if(err || !user){
      const error = new Error('An Error occurred')
      return next(error);
    }
    req.login(user, { session : false }, async (error) => {
      if( error ) return next(error)
      //We don't want to store the sensitive information such as the
      //user password in the token so we pick only the email and id
      const body = { _id : user._id, email : user.email };
      //Sign the JWT token and populate the payload with the user email and id
      const token = jwt.sign({ user : body },'top_secret');
      //Send back the token to the user
      return res.json({ token });
    });     } catch (error) {
    return next(error);
  }
  })(req, res, next);
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
