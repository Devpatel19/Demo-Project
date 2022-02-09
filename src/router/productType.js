const express = require('express')
const ProductType = require('../models/productType')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/producttypes', auth, async (req, res) => {
    const productType = new ProductType({
        ...req.body,
        owner: req.user._id
    })

    try {
        await productType.save()
        res.status(201).send(productType)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/producttypes', auth, async (req, res) => {
    try {
        const productType = await ProductType.find({})
        res.send(productType) 
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router