const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;


app.use(cors());

app.get('/api/home', (req, res) => {
  res.json({message: 'Hello World!'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });