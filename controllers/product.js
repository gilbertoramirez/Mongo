'use strict'

const Product = require('../models/product')

function getProduct(req, res) {
    console.log("get method")
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion : ${err}`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        return res.status(200).send({product})
    })
}

function getProducts(req, res) {
    Product.find({}, (err,products) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion : ${err}`})
        if(!products) return res.status(404).send({message: `No existen productos`})
        res.status(200)
            .send({ products})
    })
}

function updateProduct(req,res) {
    let productId = req.params.productId
    let productToUpdate = req.body
    Product.findByIdAndUpdate(productId, productToUpdate, (err, productUpdated) =>{
        if(err) return res.status(500).send({message: `Error al actualizar el producto : ${err}`})
        res.status(200)
        .send({ productUpdated })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error al borrar el producto : ${err}`})

        product.remove(err => {
            if(err) return res.status(500).send({message: `Error al borrar el producto : ${err}`})
            if(!product) return res.status(404).send({message: `No existe el producto`})
            res.status(200)
                .send({ message :'El producto ha sido eliminado'})
        })
    })
}

function addProduct(req, res) {
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

}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    addProduct    
}