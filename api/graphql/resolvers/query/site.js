import { AccountServer, GameDB } from '../../../database/models';
import sequelize from 'sequelize';
import { UserInputError } from 'apollo-server';

export async function newsArticles( object, args, context, info ) {
  return await GameDB.NewsArticle.findAll( { include: [ { model: GameDB.Author, as: 'author' } ] } );
}

export async function authors() {
  return await GameDB.Author.findAll();
}

export async function downloads() {
  const result = await GameDB.Download.findAll( { include: [ { model: GameDB.Author, as: 'author' } ] } );
  return result;
}

export async function newsArticle( context, args ) {
  try {
    const { id } = args;
    const result = await GameDB.NewsArticle.findOne( { where: id, include: [ { model: GameDB.Author, as: 'author' } ] } );
    return result;
  } catch ( err ) {
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ 'INVALID_ID']  } );
  }
}