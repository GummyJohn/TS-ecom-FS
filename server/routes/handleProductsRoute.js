const productsDB = {
  products: require('../db/dbProducts'),
  setProducts: function(data){ this.products = data }
}

const express = require('express');
const upload = require('../middlewares/multer');
const fsPromise = require('fs').promises;
const router = express.Router();

router.post('/add', upload.single('file'), async(req, res) => {
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

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const filtered = productsDB.products.filter((product) => product.id !== parseInt(id));
  
  productsDB.setProducts(filtered);

  if(newItem.id === parseInt(id)){
    await fsPromise.writeFile(
      '../server/db/newestItem.json',
      JSON.stringify({})
    )
  }
  
  await fsPromise.writeFile(
    '../server/db/dbProducts.json',
    JSON.stringify(productsDB.products)
  )

  res.sendStatus(200)
})

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const parsedPrice = parseInt(req.body.price)
  
  const findIndex = productsDB.products.findIndex((product) => product.id === parseInt(id))


  productsDB.products[findIndex] = {
    ...updatedProduct,
    price: parsedPrice
  }

  await fsPromise.writeFile(
    '../server/db/dbProducts.json',
    JSON.stringify(productsDB.products)
  )

  res.sendStatus(200)
})

module.exports = router;