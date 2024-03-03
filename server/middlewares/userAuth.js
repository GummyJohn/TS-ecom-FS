require('dotenv').config()
const jwt = require('jsonwebtoken')

function authAdmin(req, res, next){
  const token = req.cookies.token;
  if(!token) return res.send('Not Auhorized')
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if(err) {
      res.send('Token verification failed')
    }

    const { role } = decoded;

    if(role !== 3000) return res.send('Not Auhorized');
    next();
  })
  
}

module.exports = { authAdmin }