const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]

  }

  input SaveBookInput {
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Book {
    bookId: String!
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
    me(userId: ID!): User
    allUsers: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, image: String!, link: String!, bookId: String!, userId: ID!): User
    deleteBook(bookId: String!, userId: ID!): User
  }
`;

module.exports = typeDefs;
