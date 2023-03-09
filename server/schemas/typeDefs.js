const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]

  }

  type Book {
    bookId: String!
    authors: String! array
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type Auth {
    token: String!
    user: [User]
  }

  type Query {
    me: [User]
  }

  type Mutation {
    login(email: String!, password: String!) Auth
    addUser(username: String!, email: String!, password!): Auth
    saveBook(): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
