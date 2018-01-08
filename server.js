/**
 * Created by zhaiqianfeng on 6/5/17.
 * 演示如何传参数(argument)来调用GraphQL api
 *
 * blog: www.zhaiqianfeng.com
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');


var books = [{
    name: 'javascript初级学习教程',
    price: 50
}, {
    name: 'javascript高级学习教程',
    price: 100
}];

// 枚举类型
const Money = new GraphQLEnumType({
    name: 'MoneyEnum',
    description: "人民币/美元",
    values: {
        RMB: {
            value: 'rmb'
        },
        DOLLAR: {
            value: 'dollar'
        }
    }
});

// Book类型（相当于数据库的表结构）
const Book = new GraphQLObjectType({
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
                        type: Money,
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

// 相当于对外公开的“查询接口”
// 注意：仍然是GraphQLObjectType
const BookQueryRootType = new GraphQLObjectType({
    name: 'BookQuery',
    description: '书籍查询',
    fields: () => ({
        getBooksByName: {
            type: new GraphQLList(Book),
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
            type: new GraphQLList(Book),
            description: '查询所有书籍',
            resolve: function () {
                return books;
            }
        }
    }),
});

// 官方文档都解释为“root type"
// 我觉得在GraphQL中把schema理解为“接口”，其中query对应查询的接口，mutation对应修改的接口
const schema = new GraphQLSchema({
    query: BookQueryRootType
    //  mutation: BookMutationRootType,
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true, //启用GraphiQL
}));

app.listen(4000, () => console.log('请在浏览器中打开地址：localhost:4000/graphql'));