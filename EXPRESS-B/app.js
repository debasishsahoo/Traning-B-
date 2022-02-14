const express = require('express');
const app = express();
const { products, people } = require('./data/data')
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
    const newProductObj = products.map((product) => {
        const { id, name, price } = product
        return { id, name, price }
    })
    res.json(newProductObj)
})

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params
    const SingleProduct = products.find(
        (product) => product.id === Number(id)
    )
    if (!SingleProduct) {
        return res.status(404).send('Product Dose Not Exist')
    }
    res.json(SingleProduct)
})

app.listen(5500, () => { console.log('Server Connect http://127.0.0.1:5500'); })