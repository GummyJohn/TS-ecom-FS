const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, '../ecomm/src/images/productImages') 
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname)
  }
})

const uploadMulter = multer({storage: storage})

module.exports = uploadMulter;