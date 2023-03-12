const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

    me: async (parent, { userId }) => {
      return User.findOne({ _id: UserId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
        // First we create the user
        const user = await User.create({ username, email, password });
        // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
        const token = signToken(user);
        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      },
    login: async (parent, { username, email, password }) => {
        // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
        const user = await User.findOne({ email });
  
        // If there is no user with that email address, return an Authentication error stating so
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
        const correctPw = await user.isCorrectPassword(password);
  
        // If the password is incorrect, return an Authentication error stating so
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        // If email and password are correct, sign user into the application with a JWT
        const token = signToken(user);
  
        // Return an `Auth` object that consists of the signed token and user's information
        return { token, user };
      },


    saveBook: async (parent, { saveBookInput }) => {
      return User.findOneAndUpdate(
        { _id: User.__id },
        {
          $addToSet: { savedBooks:  { saveBookInput } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    deleteBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    },

  },
};

module.exports = resolvers;
