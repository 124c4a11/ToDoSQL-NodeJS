const express = require('express');
const path = require('path');

const app = express();

const todoRoutes = require('./routes/todo');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use('/api/todo', todoRoutes);


app.use((req, res, next) => {
  res.sendFile('/index.html');
  next();
});

module.exports = app;
