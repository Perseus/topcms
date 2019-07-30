import { createUser, loginUser } from './auth';
import { createAuthor, editAuthor, deleteAuthor } from './site';

export const Mutation = {
  createUser,
  loginUser,
  createAuthor,
  editAuthor,
  deleteAuthor
};
