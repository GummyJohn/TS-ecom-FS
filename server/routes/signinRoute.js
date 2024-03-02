require('dotenv').config();
const users = require('../db/users.json');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/', async (req, res) => {
  const {username, password} = req.body;
  const findUser = users.find((user) => user.username === username);

  if(!findUser) return res.send('user not found')

  const passwordCompare = await bcrypt.compare(password, findUser.password)

  if(passwordCompare === false) return res.send('Incorrect password');

  const accessToken = jwt.sign(
    { username: findUser.username, userId: findUser.userId, role: findUser.role},
    process.env.SECRET_KEY
  )

  res.cookie('token', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
  })
  
  res.status(200).send('Authentication successful')
})

module.exports = router;