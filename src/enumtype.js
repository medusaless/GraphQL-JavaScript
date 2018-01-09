
const {GraphQLEnumType} = require('graphql');

const MoneyEnum = new GraphQLEnumType({
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

module.exports = MoneyEnum;