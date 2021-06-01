import { gql } from "@apollo/client";

export const STORIES_QUERY = gql`
  query Stories {
    stories {
      id
      name
      image
      description
      extra
    }
  }
`;
