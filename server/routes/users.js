const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


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
      const body = { _id : user._id, email : user.email };
      const token = jwt.sign({ user : body },'top_secret');

      return res.json({ token: token, user_id: user._id, type: user.type });
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
