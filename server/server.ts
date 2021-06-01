import { gql, ApolloServer, ServerInfo } from "apollo-server";
const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL World!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
