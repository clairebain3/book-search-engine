import { gql } from '@apollo/client';

export const GET_ME = gql`
query GET_ME {
  me{
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;