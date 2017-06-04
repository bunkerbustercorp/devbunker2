const { makeExecutableSchema } = require('graphql-tools');

const schema = require('./schema');
const resolvers = require('./resolvers');

const Schema  = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers
});

module.exports = Schema;