const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
//const sharp = require('sharp')
//const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        //sendWelcomeEmail(user.email,user.name)
        console.log("test")
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).send({ user, token })
    } catch (e) {
        console.log('test')
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        //console.log("test")
        console.log(req.body.password)
        const user = await User.findByCredentials(req.body.email, req.body.password, req.body._id)
       //console.log("test")
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports = router