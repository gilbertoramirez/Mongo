'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req, res) {

    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.avatar = user.gravatar()

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear al usuario: ${err}` })

        return res.status(201).send({ token: service.createToken(user) })
    })
}

const signIn = (req, res) => {
    console.log(req.body)
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

        req.user = user
        return res.status(200).send({
            msg: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}