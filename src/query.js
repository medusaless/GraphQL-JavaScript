var {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

var {BookType}= require('./businesstype');

var books = require('./data');


// 相当于对外公开的“查询接口”
// 注意：仍然是GraphQLObjectType
const BookQueryRootType = new GraphQLObjectType({
    name: 'BookQuery',
    description: '书籍查询',
    fields: () => ({
        getBooksByName: {
            type: new GraphQLList(BookType),
            description: '根据关键字查询某本书',
            args: {
                keyword: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: '关键字'
                },
            },
            resolve: function (source, {
                keyword // 名称必须和args内的一样
            }) {
                return books.filter((book) => book.name.indexOf(keyword) != -1);
            }
        },
        getAllBooks: {
            type: new GraphQLList(BookType),
            description: '查询所有书籍',
            resolve: function () {
                return books;
            }
        }
    }),
});

module.exports = BookQueryRootType;