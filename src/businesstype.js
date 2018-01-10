var {
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLObjectType
} = require('graphql');

var MoneyEnum = require('./enumtype');

// Book类型（相当于数据库的表结构）
const BookType = new GraphQLObjectType({
    name: 'BookType',
    description: "书籍类型",
    fields: () => {
        return ({
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            price: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            info: {
                type: GraphQLString,
                args: {
                    moneyType: {
                        type: MoneyEnum,
                        defaultValue:'rmb'
                    }
                },
                resolve: function (book, {
                    moneyType // 名称必须和args内的一样
                }) {
                    let price = moneyType == 'dollar' ? book.price / 6.5 : book.price;
                    return `书名${book.name},价格:${price}`;
                }
            }
        });
    },
});

const BookInputType = new GraphQLInputObjectType({
    name:'BookInputType',
    fields:() => {
        return ({
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            price: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            info:{
                type: new GraphQLNonNull(GraphQLString)
            }
        });
    }
});

exports.BookType = BookType;
exports.BookInputType = BookInputType;