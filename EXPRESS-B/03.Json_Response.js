const express = require('express');
const app = express();
const { Abir, people } = require('./data/data')

app.get('/', (req, res) => {
    res.json(Abir)
})


app.listen(5000, () => { console.log('Server Connect http://127.0.0.1:5000'); })