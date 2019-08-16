import { createUser, loginUser } from './auth';
import { createAuthor, editAuthor, deleteAuthor, createDownload, editDownload, deleteDownload, createNewsArticle, deleteNewsArticle, editNewsArticle } from './site';
import { updateServerRates } from './game';
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
};
