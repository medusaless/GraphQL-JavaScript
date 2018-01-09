
const {GraphQLSchema} = require('graphql');
const BookQueryRootType = require('./query')

module.exports =  new GraphQLSchema({
    query: BookQueryRootType
});