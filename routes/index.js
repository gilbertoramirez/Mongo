'use strict'

const express = require('express')
const productControllers = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()


api.get('/products', auth, productControllers.getProducts)
api.get('/product/:productId', productControllers.getProduct)
api.post('/add', productControllers.addProduct)
api.put('/product/:productId', productControllers.updateProduct)
api.delete('/product/:productId', productControllers.deleteProduct)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api