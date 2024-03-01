const productDB = {
  products : require('../db/dbProducts.json'),
  setProducts: function(data){ this.products = data }
}
const newItem = require('../db/newestItem.json');
const fsPromise = require('fs').promises;
const express = require('express');
const router = express.Router();

router.get('/all', (req, res) => {
  res.json(productDB.products);
})

router.get('/technology', (req, res) => {
  const filtered = productDB.products.filter((product) => product.category === 'technology')

  res.json(filtered);
})

router.get('/jewerly', (req, res) => {
  const filtered = productDB.products.filter((product) => product.category === 'jewelery')

  res.json(filtered);
})

router.get("/men's-clothes", (req, res) => {
  const filtered = productDB.products.filter((product) => product.category === "men's clothing")

  res.json(filtered);
})

router.get("/women's-clothes", (req, res) => {
  const filtered = productDB.products.filter((product) => product.category === "women's clothing")

  res.json(filtered);
})

router.get('/newItem', (req, res) => {
  res.json(newItem)
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const filtered = productDB.products.filter((product) => product.id !== parseInt(id));
  
  productDB.setProducts(filtered);

  if(newItem.id === parseInt(id)){
    fsPromise.writeFile(
      '../server/db/newestItem.json',
      JSON.stringify({})
    )
  }
  
  fsPromise.writeFile(
    '../server/db/dbProducts.json',
    JSON.stringify(productDB.products)
  )

  res.sendStatus(200)
})

module.exports = router;