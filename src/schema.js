
const {GraphQLSchema} = require('graphql');
const BookQueryRootType = require('./query')
const BookMutationRootType = require('./mutation');

module.exports =  new GraphQLSchema({
    query: BookQueryRootType,
    mutation:BookMutationRootType
});