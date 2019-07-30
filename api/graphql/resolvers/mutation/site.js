import { AccountServer, GameDB } from '../../../database/models/index';
import { UserInputError } from 'apollo-server';
import { composeGraphQLError } from '../../../helpers/errorHandler';

export async function createAuthor( object, args, context, info ) {
  const { name } = args;
  try {
    const createdAuthor = await GameDB.Author.create( {
      name
    } );
    return createdAuthor;
  } catch ( err ) {
    err = composeGraphQLError( err, 'author', 'create' );
    console.log( err );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
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

export async function deleteAuthor( object, args, context, info ) {
  const { id } = args;

  try {
    const authorDeleted = await GameDB.Author.destroy( {
      where: {
        id
      }
    } );

    if ( authorDeleted ) {
      return { id };
    }
  } catch ( err ) {
    err = composeGraphQLError( err, 'author', 'delete' );
    console.log( err );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
}