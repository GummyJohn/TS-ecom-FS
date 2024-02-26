const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());

app.use('/products', require('./routes/productRoute'))

app.listen(4001, () => console.log('listening to port 4001'))