import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
         _id
        username
        }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
      _id
      username
        }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String!, $link: String!, $userId: ID!) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link, userId: $userId) {
      savedBooks
      {  bookId
        authors
        description
        title
        image
         link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation REMOVE_BOOK ($bookId: String!, $userId: ID!) {
  deleteBook(bookId: $bookId, userId: $userId) {
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