const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.get('/example', (req, res) => {
  res.send('hitting lol');
})

app.get('/example/:name/:age', (req, res) => {
  console.log(req.params);
  // query récupère dans l'url
  console.log(req.query);
  res.send('hitting hmmmm');
})

app.listen(3000);