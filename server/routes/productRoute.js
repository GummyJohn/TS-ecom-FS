const products = require('../db/dbProducts.json');
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  res.json(products);
})

router.get('/Technology', (req, res) => {
  const filtered = products.filter((product) => product.category === 'techonology')

  res.json(filtered);
})

router.get('/Jewerly', (req, res) => {
  const filtered = products.filter((product) => product.category === 'jewelery')

  res.json(filtered);
})

router.get("/Men's-Clothes", (req, res) => {
  const filtered = products.filter((product) => product.category === "men's clothing")

  res.json(filtered);
})

router.get("/Women's-Clothes", (req, res) => {
  const filtered = products.filter((product) => product.category === "women's clothing")

  res.json(filtered);
})

module.exports = router;