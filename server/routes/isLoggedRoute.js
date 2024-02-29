require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const authHeader = req.headers.cookie;
  if(!authHeader) return;
  const token = authHeader.split('=')[1]
  
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) res.sendStatus(401)
    req.user = user
  })
  
  res.status(200).json({user: req.user.username ,role: req.user.role});
})


module.exports = router