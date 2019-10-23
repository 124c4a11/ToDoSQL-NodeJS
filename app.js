const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true
}));


app.use((req, res, next) => {
  res.sendFile('/index.html');
  next();
});

module.exports = app;
