import { AccountServer, GameDB } from '../../../database/models';
import sequelize from 'sequelize';

export async function newsArticles( object, args, context, info ) {
  return await GameDB.NewsArticle.findAll();
}

export async function authors() {
  return await GameDB.Author.findAll();
}
