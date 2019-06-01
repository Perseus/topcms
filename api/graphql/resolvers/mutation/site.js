import { AccountServer, GameDB } from '../../../database/models/index';

export async function createAuthor( object, args, context, info ) {
  const { name } = args;
  try {
    const createdAuthor = await GameDB.Author.create( {
      name
    } );
    return createdAuthor;
  } catch ( err ) {
    return err;
  }
}

export async function editAuthor( object, args, context, info ) {
  const { id, name } = args;
  try {
    const authorUpdated = await GameDB.Author.update( {
      name
    }, {
      where: {
        id
      }
    } );
    if ( authorUpdated ) {
      return await GameDB.Author.findOne( { where: { id } } );
    } else {
      return 'UPDATE_FAILED';
    }
  } catch ( err ) {
    return err;
  }
}
