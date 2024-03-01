const productsDB = {
  products: require('../db/dbProducts'),
  setProducts: function(data){ this.products = data }
}

const express = require('express');
const upload = require('../multer');
const fsPromise = require('fs').promises;
const router = express.Router();

router.post('/', upload.single('file'), async(req, res) => {
  const {title, price, description, category} = req.body;
  const imageInfo = req.file.originalname;

  const aleadyInInventory = productsDB.products.find(
    (item) => item.title.toLowerCase() === title.toLowerCase() || 
      item.title.toLowerCase().includes(title.toLowerCase())
  )

  if(aleadyInInventory) return res.sendStatus(404)
  
  const newProduct = {
    id: productsDB.products.length + 1,
    title,
    price : parseInt(price),
    description,
    category,
    image: imageInfo
  }

  productsDB.setProducts([...productsDB.products, newProduct])

  await fsPromise.writeFile(
    '../server/db/dbProducts.json',
    JSON.stringify(productsDB.products)
  )

  await fsPromise.writeFile(
    '../server/db/newestItem.json',
    JSON.stringify(newProduct)
  )

  res.sendStatus(200)
})

module.exports = router;