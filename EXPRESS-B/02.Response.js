const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./public'))

app.get('/', (req, res) => {
    console.log('User hit the Resourse');
    res.status(200).send('Home Page')
})
app.get('/file', (req, res) => {
    res.sendFile(path.resolve(__dirname, './template/index.html'))
})
app.get('/*', (req, res) => {
    res.sendFile('<h1>Page Not Fount</h1>')
})

app.listen(5000, () => { console.log('Server Connect http://127.0.0.1:5000'); })