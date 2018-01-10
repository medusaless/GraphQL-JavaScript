
var express = require('express');
var graphqlHTTP = require('express-graphql');
const { host, port } = require('./config.json');
var schema = require('./schema')

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(port, host, () => console.log(`this address is：http://${host}:${port}/graphql`));