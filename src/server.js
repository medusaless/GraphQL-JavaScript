
var express = require('express');
var graphqlHTTP = require('express-graphql');

var schema = require('./schema')

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));