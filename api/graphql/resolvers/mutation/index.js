import { createUser, loginUser } from './auth';
import { createAuthor, editAuthor } from './site';

export const Mutation = {
  createUser,
  loginUser,
  createAuthor,
  editAuthor
};
