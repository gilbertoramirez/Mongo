'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Get Products
app.get('/api/products', (req, res) => {
    res.status(200)
        .send({ products: [] })
})

//Get Product
app.get('/api/product/:id', (req, res) => {
    console.log("get method")
})

//Add Product
app.post('/api/add', (req, res) => {
    console.log('POST /api/add')
    console.log(req.body)
    let product = new Product()

    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    console.log(product)

    product.save((err, productStored) => {
        if (err) {
            res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` })
        }
        res.status(200).send({ product: productStored })
    })
})

//Update Product
app.put('/api/product/:id', (req, res) => {

})

//Delete product
app.delete('/api/product/:id', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err
    console.log('Conexion establecida')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})