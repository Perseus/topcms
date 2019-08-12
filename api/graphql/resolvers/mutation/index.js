import { createUser, loginUser } from './auth';
import { createAuthor, editAuthor, deleteAuthor, createDownload, editDownload, deleteDownload, createNewsArticle, deleteNewsArticle, editNewsArticle } from './site';

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
  editNewsArticle
};
