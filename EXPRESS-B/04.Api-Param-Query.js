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
    const id = req.params.id
    console.log('id:', id)
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
    console.log('rid:', rid)
    console.log('pid:', pid)
    console.log('req.params:', req.params)
    res.send('Hello World')
})

app.get('/api/product/query', (req, res) => {
    const { search, limit } = req.query
    console.log('search:', search)
    //Act As root
    let SortedProducts = [...products]
    console.log('SortedProducts:', SortedProducts)

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



    res.status(200).json(SortedProducts)



})



// = is for Assign the Value
// == Compare the Value only
// === Compare the Value and Datatype

// ==== Debasish



app.listen(5500, () => { console.log('Server Connect http://127.0.0.1:5500'); })