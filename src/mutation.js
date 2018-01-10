var {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');

var {
    BookType,
    BookInputType
} = require('./businesstype');

var books = require('./data');

// 相当于对外公开的“修改接口”
// 注意：仍然是GraphQLObjectType
const BookMutationRootType = new GraphQLObjectType({
    name: 'BookMutation',
    description: '新增书籍',
    fields: () => ({
        addBook: {
            type: BookType,
            description: '新增书籍',
            args: {
                bookInfo: {
                    type: BookInputType,  // 这里要注意，类型为GraphQLInputObjectType
                },
            },
            resolve: function (source, {
                bookInfo // 名称必须和args内的一样
            }) {
                var book = {
                    name: bookInfo.name,
                    price: bookInfo.price,
                    info: bookInfo.info
                };

                books.push(book);
                return book;
            }
        }
    }),
});

module.exports = BookMutationRootType;