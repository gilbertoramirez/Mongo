'use strict'

const express = require('express')
const productControllers = require('../controllers/product')
const api = express.Router()


api.get('/products', productControllers.getProducts)
api.get('/product/:productId', productControllers.getProduct)
api.post('/add', productControllers.addProduct)
api.put('/product/:productId', productControllers.updateProduct)
api.delete('/product/:productId', productControllers.deleteProduct)

module.exports = api