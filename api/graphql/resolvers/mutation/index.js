const { createUser, loginUser, logoutUser } = require( './auth' );
const {
  createAuthor, editAuthor, deleteAuthor, createDownload, editDownload, deleteDownload, createNewsArticle, deleteNewsArticle, editNewsArticle
} = require( './site' );
const GameMutations = require( './game' );
const UserMutations = require( './user' );
const CommerceMutations = require( './commerce' );

module.exports.Mutation = {
  createUser,
  loginUser,
  createAuthor,
  editAuthor,
  deleteAuthor,
  createDownload,
  editDownload,
  deleteDownload,
  createNewsArticle,
  deleteNewsArticle,
  editNewsArticle,
  logoutUser,
  ...GameMutations,
  ...UserMutations,
  ...CommerceMutations,
};
