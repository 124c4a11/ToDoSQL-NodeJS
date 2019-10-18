const express = require('express');
const path = require('path');

const app = express();

const todoModel = require('./models/todoModel');

const todoRoutes = require('./routes/todo');


app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.sendFile('/index.html');
  next();
});


app.use('/api/todo', todoRoutes);


module.exports = app;
