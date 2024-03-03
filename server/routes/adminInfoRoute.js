const users = require('../db/users.json');
const products = require('../db/dbProducts.json');
const middlewares = require('../middlewares/userAuth')
const express = require('express');
const router = express.Router();

function totalMoney(array){
  const totalSales = array.reduce(
    (total, curr) => {
      if(curr.role === 2000){
        return total + curr.spent;
      }else{
        return total;
      }
    },
    0
  );
  return totalSales;
}

function topShopper(array){
  let topCustomer = ''
  let topCustomerSum = 0;

  for(let i = 0; i < array.length; i++){
     if(users[i].spent > topCustomerSum){
       topCustomerSum = array[i].spent
       topCustomer = array[i].username
     }
  }

  return {topCustomer, topCustomerSum};
}

function totalUsers(array){
  let amountOfUser = 0

  users.forEach((user) => {
    if(user.role === 2000){
      amountOfUser++
    }
  })

  return amountOfUser;
}

router.get('/info', middlewares.authAdmin, (req, res) => {
  const amountOfProducts = products.length;
  const totalSales = totalMoney(users);
  const amountOfUser = totalUsers(users);
  let { topCustomer, topCustomerSum } = topShopper(users);

  res.status(200).json({
    amountOfUser, amountOfProducts, 
    topCustomer, topCustomerSum, 
    totalSales 
  })
})

module.exports = router;