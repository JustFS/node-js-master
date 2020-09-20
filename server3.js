const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/'){
    res.write('Hello world from nodejs');
    res.end();
  } else {
    res.write("Lol fdp t'as cru quoi");
    res.end();
  }
})

server.listen('3000');