import { AccountServer, GameDB } from '../../../database/models/index';

export async function users( object, args, context, info ) {
  const users = await AccountServer.User.findAll();
  return users;
}
