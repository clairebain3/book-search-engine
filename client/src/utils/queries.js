import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GET_ME($userId: ID!) {
    me (userId: $userId) {
      savedBooks {  bookId
        authors
        description
        title
        image
         link
      }
    }
  }
`;