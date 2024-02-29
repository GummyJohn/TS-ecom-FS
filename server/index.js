const express = require('express');
const cors = require('cors');
const cookieParser =require('cookie-parser');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/products', require('./routes/productRoute'));
app.use('/register', require('./routes/registerRoute'));
app.use('/signin', require('./routes/signinRoute'));
app.use('/islogged', require('./routes/isLoggedRoute'));
app.use('/signout', require('./routes/signoutRoute'));
app.use('/addproduct', require('./routes/addProductRoute'));

app.listen(4001, () => console.log('listening to port 4001'))