const products = require('../db/dbProducts.json');
const newItem = require('../db/newestItem.json');
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  res.json(products);
})

router.get('/technology', (req, res) => {
  const filtered = products.filter((product) => product.category === 'technology')

  res.json(filtered);
})

router.get('/jewerly', (req, res) => {
  const filtered = products.filter((product) => product.category === 'jewelery')

  res.json(filtered);
})

router.get("/men's-clothes", (req, res) => {
  const filtered = products.filter((product) => product.category === "men's clothing")

  res.json(filtered);
})

router.get("/women's-clothes", (req, res) => {
  const filtered = products.filter((product) => product.category === "women's clothing")

  res.json(filtered);
})

router.get('/newItem', (req, res) => {
  res.json(newItem)
})

module.exports = router;