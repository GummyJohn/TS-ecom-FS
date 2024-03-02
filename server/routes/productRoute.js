const products = require('../db/dbProducts.json');
const newItem = require('../db/newestItem.json');
const middlewares = require('../middlewares/userAuth')
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  res.json(products);
})

router.get('/newItem', (req, res) => {
  res.json(newItem)
})

router.get('/item/:id', middlewares.authAdmin, (req, res) => {
  const { id } = req.params;
  
  const findProduct = products.find((product) => product.id === parseInt(id))

  res.status(200).json(findProduct);
})

router.get('/getitem/:id', (req, res) => {
  const { id } = req.params;
  
  const findProduct = products.find((product) => product.id === parseInt(id))

  res.status(200).json(findProduct);
})

router.get('/technology', (req, res) => {
  const filtered = products.filter((product) => product.category === 'technology')

  res.json(filtered);
})

router.get('/jewelry', (req, res) => {
  const filtered = products.filter((product) => product.category === 'jewelery')

  res.json(filtered);
})

router.get("/men-clothing", (req, res) => {
  const filtered = products.filter((product) => product.category === "men's clothing")

  res.json(filtered);
})

router.get("/women-clothing", (req, res) => {
  const filtered = products.filter((product) => product.category === "women's clothing")

  res.json(filtered);
})

module.exports = router;