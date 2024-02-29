require('dotenv').config();
const users = require('../db/users.json');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/', async (req, res) => {
  const {username, password} = req.body;

  const findUser = users.find((user) => user.username === username);

  if(!findUser) return res.status(404);

  const passwordCompare = await bcrypt.compare(password, findUser.password)
  
  if(!passwordCompare) return res.status(401);

  const accessToken = jwt.sign(
    { username: findUser.username, userId: findUser.userId, role: findUser.role},
    process.env.SECRET_KEY
  )

  res.cookie('token', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
  })
  
  res.sendStatus(200)
})

module.exports = router;