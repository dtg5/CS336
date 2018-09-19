const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.redirect("http://localhost:3000/index.html"));

app.listen(3000, function () {
  console.log('My app is listening on port 3000!');
});

app.use(express.static('public'));
