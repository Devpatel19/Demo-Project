const express = require('express')
const res = require('express/lib/response')

const userRouter = require('./src/router/user')
const productTypeRouter = require('./src/router/productType')
const productRouter = require('./src/router/product')
require('./src/db/db')
const app = express()
const port = 5000

app.use(express.json())
app.use(userRouter)
app.use(productTypeRouter)
app.use(productRouter)
app.get('/', (req, res) => res.send("Hello !!!"))

app.listen(port, () => {
    console.log('server is up on Port ' + port)
})