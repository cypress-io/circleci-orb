const https = require('http');

// delay 10 seconds before starting server
setTimeout(() => {
  https.createServer({}, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write('hello')
    res.end()
  }).listen(8080, () => {
    console.log('Server running at http://localhost:8080/')
  })
}, 10000)
