const express = require('express')
const router = express.Router()

const {createUser, login} = require('../controllers/userController')
const {createProduct, updateProduct} = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')

router.post('/createUser',createUser)
router.post('/login', login)

router.post('/createProduct', authentication, createProduct)
router.put('/user/:userId/updateProduct/:productId', authentication, updateProduct)

module.exports = router
