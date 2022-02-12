const http = require('http')
const { readFileSync } = require('fs')

const HomePage = readFileSync('./sticky-sidebar/index.html')
const HomeStyle = readFileSync('./sticky-sidebar/style.css')
const HomeJs = readFileSync('./sticky-sidebar/script.js')
const HomeSvg = readFileSync('./sticky-sidebar/SVG_Logo.svg')
const HomeJson = readFileSync('./sticky-sidebar/sample2.json')

const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'contentType': 'text/html' })
        res.write(HomePage)
        res.end()
    }
    else if (url === '/about') {
        res.writeHead(201, { 'contentType': 'text/html' })
        res.write('<h2>About Us</h2>')
        res.end()
    }
    else if (url === '/style') {
        res.writeHead(201, { 'contentType': 'text/css' })
        res.write(HomeStyle)
        res.end()
    }
    else if (url === '/js') {
        res.writeHead(201, { 'contentType': 'text/javascript' })
        res.write(HomeJs)
        res.end()
    }
    else if (url === '/svg') {
        res.writeHead(201, { 'contentType': 'text/svg+xml' })
        res.write(HomeSvg)
        res.end()
    }
    else if (url === '/json') {
        res.writeHead(201, { 'contentType': 'text/json' })
        res.write(HomeJson)
        res.end()
    }
    else {
        res.writeHead(404, { 'contentType': 'text/abir' })
        res.write('<h1>!.....Page not Found</h1>')
        res.end()
    }
})

server.listen(5000, () => { console.log('Server Connect at http://localhost:5000'); })
