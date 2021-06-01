import { gql, ApolloServer, ServerInfo } from "apollo-server";
import { stories, extra } from "./resolvers/Query";
import { editStoryName } from "./resolvers/Mutation";

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
  type Story {
    id: ID!
    name: String!
    image: String!
    description: String!
    extra: String
  }

  type Query {
    stories: [Story!]!
  }

  type Mutation {
    editStoryName(id: ID!, name: String!): Story
  }
`;

const resolvers = {
  Query: {
    stories,
  },
  Story: {
    extra,
  },
  Mutation: {
    editStoryName,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }: ServerInfo) => {
  console.log(`Server running at ${url}`);
});
