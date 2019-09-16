import { createUser, loginUser, logoutUser } from './auth';
import { createAuthor, editAuthor, deleteAuthor, createDownload, editDownload, deleteDownload, createNewsArticle, deleteNewsArticle, editNewsArticle } from './site';
import * as GameMutations from './game';
import * as UserMutations from './user';

export const Mutation = {
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
};
