"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type Query {
    greeting: String
  }
`;
const resolvers = {
    Query: {
        greeting: () => "Hello GraphQL World!",
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
server.listen({ port: 9000 }).then(({ url }) => {
    console.log(`Server running at ${url}`);
});
