import { gql } from "@apollo/client";

export const EDIT_STORY_NAME = gql`
  mutation EditStoryName($id: ID!, $name: String!) {
    editStoryName(id: $id, name: $name) {
      id
      name
    }
  }
`;
