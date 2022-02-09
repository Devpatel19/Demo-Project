const express = require('express')
const {Product, Review} = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/products/:producttype_id', auth, async (req, res) => {
    const producttype = req.params.producttype_id
    const product = new Product({
        ...req.body,
        owner: req.user._id,
        types: producttype 
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/products', auth, async (req, res) => {
    try {
        const product = await Product.find({})
        res.send(product) 
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/products/reviews/:product_id', auth , async(req,res) => {
    const productid = req.params.product_id
    const { dislike,like, comment} = req.body
    try{
        const product = await Product.findById(productid)
        
        if(!product){
            throw new Error('product not find')
        }
        const review = new Review({
            ...req.body,
            user: req.user._id,
            types: productid 
        })
        await review.save()
        product.reviews = review,
        product.like = product.reviews.reduce((acc, item) => item.like + acc, product.like)
        product.dislike = product.reviews.reduce((acc, item) => item.dislike + acc, product.dislike)
        await product.save()
        res.status(201).send(product)
    }catch{
        res.status(404)
        throw new Error('Product not found')
    }
})

router.get('/products/lastcreated', auth, async (req, res) => {
    try {
        const product = await Product.find({}).sort({ createdAt : -1}).limit(1)
        res.send(product) 
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/products/mostliked', auth, async (req, res) => {
    try {
        const product = await Product.find({}).sort({ like : -1}).limit(1)
        res.send(product) 
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/products/:producttype_id', auth, async (req, res) => {
    const _id = req.params.producttype_id

    try {
        const product = await Product.find({ types: _id })
        res.send(product) 
    } catch (e) {
        res.status(500).send()
    }
})
router.put('/products/:product_id', auth, async (req, res) => {
    const {
        productname,
        brand,
        description
    } = req.body


    try {
        const product = await Product.findOne({ _id: req.params.product_id })
        if (!product) {
            return res.status(404).send({ error : 'Not fatch product'})
        }

        product.productname = productname,
        product.brand = brand,
        product.description = description
        const updateproduct = await product.save()
        res.json(updateproduct)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/product/:id', auth, async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!product) {
            res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router