const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.sendFile('/index.html');
  next();
});


module.exports = app;
