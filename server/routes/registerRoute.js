const userDB = {
  users: require('../db/users.json'),
  setUsers: function(data){ this.users = data }
}
const express = require('express');
const fsPromise = require('fs').promises;
const bcrypt = require('bcrypt')
const router = express.Router();

router.post('/', async (req, res) => {
  const {username, password, email} = req.body;
  
  const findUser = userDB.users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  )
  const findEmail =  userDB.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  )

  if(findUser){ return res.sendStatus(404);}
  if(findEmail){ return res.sendStatus(403);}

  const hashPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: userDB.users.length + 1,
    username,
    email,
    password: hashPassword,
    role: 2000
  }

  userDB.setUsers([...userDB.users, newUser])

  await fsPromise.writeFile(
    '../server/db/users.json',
    JSON.stringify(userDB.users)
  )

  res.sendStatus(200);
})

module.exports = router;