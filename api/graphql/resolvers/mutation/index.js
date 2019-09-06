import { createUser, loginUser, logoutUser } from './auth';
import { createAuthor, editAuthor, deleteAuthor, createDownload, editDownload, deleteDownload, createNewsArticle, deleteNewsArticle, editNewsArticle } from './site';
import { updateServerRates } from './game';
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
  updateServerRates,
  logoutUser,
  ...UserMutations,
};
