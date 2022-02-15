const express = require('express');
const { products, people } = require('./data/data')
const logger = require('./middlewares/logger')
const morgan = require('morgan')
const fs = require('fs')
const app = express();

app.use(express.json())

//app.use(logger)
//app.use(morgan('tiny'))
let accessLogStream = fs.createWriteStream('./log/access.log', { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

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
    const id = req.params.id
    // console.log('id:', id)
    const SingleProduct = products.find(
        (product) => product.id === Number(id)
    )
    if (!SingleProduct) {
        return res.status(404).send('Product Dose Not Exist')
    }
    res.json(SingleProduct)
})

app.get('/api/product/:pid/review/:rid', (req, res) => {
    const { pid, rid } = req.params
    // console.log('rid:', rid)
    // console.log('pid:', pid)
    // console.log('req.params:', req.params)
    res.send('Hello World')
})

app.get('/api/product/query', (req, res) => {
    const { search, limit, sort } = req.query
    // console.log('req.query:', req.query)
    //Act As root
    let SortedProducts = [...products]
    //http://localhost:5500/api/product/query/?search=a
    //http://localhost:5500/api/product/query/?search=a&limit=1
    //http://localhost:5500/api/product/query/?search=&limit=2
    if (search) {
        SortedProducts = SortedProducts.filter(
            (product) => {
                return product.name.startsWith(search)
            }
        )
    }
    if (limit) {
        SortedProducts = SortedProducts.slice(0, Number(limit))
    }
    if (sort === 'name') {
        //when we sort string data always use REGX

        SortedProducts = SortedProducts.sort((x, y) => {
            let a = x.name.toUpperCase(), b = y.name.toUpperCase()

            return a == b ? 0 : a > b ? 1 : -1
        });
    }
    else if (sort === 'price') {
        SortedProducts = SortedProducts.sort((x, y) => {
            return y.price - x.price
        });
    }
    else {
        SortedProducts = SortedProducts.sort()
    }
    res.status(200).json(SortedProducts)



})

app.listen(5500, () => { console.log('Server Connect http://127.0.0.1:5500'); })