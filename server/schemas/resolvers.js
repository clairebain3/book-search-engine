const { User } = require('../models');

const resolvers = {
  Query: {

    user: async (parent, { userId }) => {
      return User.findOne({ _id: UserId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      return User.create({ username, email, password });
    },
    saveBook: async (parent, { saveBookInput }) => {
      return User.findOneAndUpdate(
        { _id: user.__id },
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
      return Book.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
