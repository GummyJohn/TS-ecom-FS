const users = require('../db/users.json')
const express = require('express');
const router = express.Router();
const fsPromise = require('fs').promises;

router.put('/', async (req, res) => {
  const { user, spent } = req.body.role;

  const userIndex = users.findIndex((users) => users.username === user);
  
  users[userIndex] = {
    ...users[userIndex],
    spent: users[userIndex].spent + spent
  }

  await fsPromise.writeFile(
    '../server/db/users.json',
    JSON.stringify(users)
  )

  res.clearCookie('token')

  res.sendStatus(200)
})


module.exports = router;