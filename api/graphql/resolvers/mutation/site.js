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
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
}

export async function createDownload( object, args, context, info ) {
  const { title, url, author } = args;

  try {
    const createdDownload = await GameDB.Download.create( {
      title,
      url,
      author_id: author,
    } );
    createdDownload.author = await createdDownload.getAuthor();
    return createdDownload;
  } catch ( err ) {
    err = composeGraphQLError( err, 'download', 'create' );
    throw new  UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
}

export async function editDownload( object, args, context, info ) {
  const { id, title, url, author } = args;

  try {
    const downloadUpdated = await GameDB.Download.update( {
      title,
      url,
      author_id: author
    }, { 
      where: {
        id
      }
    } );
    if ( downloadUpdated ) {
      const download = await GameDB.Download.findOne( { where: { id }, include: [ { model: GameDB.Author, as: 'author' } ] }  );
      return download;
    } else {
      throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ 'DOWNLOAD_UPDATE_FAILED' ] } );
    }
  } catch ( err ) {
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
}


export async function deleteDownload( object, args, context, info ) {

  
  const { id } = args;
  try {
    const deletedDownload = await GameDB.Download.destroy ( {
      where: {
        id
      }
    } );

    if ( deletedDownload ) {
      return { id };
    }
  } catch ( err ) {
    err = composeGraphQLError( err, 'download', 'delete' );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
}