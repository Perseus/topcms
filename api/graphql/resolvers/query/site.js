import { AccountServer, GameDB } from '../../../database/models';
import sequelize from 'sequelize';

export async function newsArticles( object, args, context, info ) {
  return await GameDB.NewsArticle.findAll();
}

export async function authors() {
  return await GameDB.Author.findAll();
}

export async function downloads() {
  const result = await GameDB.Download.findAll( { include: [ { model: GameDB.Author, as: 'author' } ] } );
  return result;
}