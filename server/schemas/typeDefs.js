const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  input SaveBookInput {
    bookId: String
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Book {
    bookId: ID!
    authors: [String] 
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
