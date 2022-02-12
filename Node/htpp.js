const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Home Page')
    }
    else if (req.url === '/about') {
        res.end('about Page')
    }
    else if (req.url === '/contact') {
        res.end('Cantact Page')
    }
    else if (req.url === '/blog') {
        res.end('<ul><li>blog Page</li><li>blog1 Page</li><li>blog2 Page</li></ul>')
    }
    else {
        res.end('<h1>Opps!...Page Not Found</h1>')
    }
})

server.listen(5000, () => { console.log('Server Connect at http://localhost:5000'); })