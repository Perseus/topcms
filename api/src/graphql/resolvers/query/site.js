const sequelize = require( 'sequelize' );
const { UserInputError } = require( 'apollo-server' );

module.exports.newsArticles = async function newsArticles( object, args, context, info ) {
  return await GameDB.NewsArticle.findAll( { include: [ { model: GameDB.Author, as: 'author' } ] } );
};

module.exports.authors = async function authors() {
  return await GameDB.Author.findAll();
};

module.exports.downloads = async function downloads() {
  const result = await GameDB.Download.findAll( { include: [ { model: GameDB.Author, as: 'author' } ] } );
  return result;
};

module.exports.newsArticle = async function newsArticle( context, args ) {
  try {
    const { id } = args;
    const result = await GameDB.NewsArticle.findOne( { where: id, include: [ { model: GameDB.Author, as: 'author' } ] } );
    return result;
  } catch ( err ) {
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ 'INVALID_ID' ] } );
  }
};

module.exports.newsFeed = async function newsFeed( context, args ) {
  let { offset, limit } = args;
  if ( !offset ) {
    offset = 0;
  }

  if ( !limit ) {
    limit = 10;
  }

  try {
    const articles = await GameDB.NewsArticle.findAll( {
      order: [ [ 'updatedAt', 'DESC' ] ], offset, limit, include: [ { model: GameDB.Author, as: 'author' } ]
    } );
    const articlesQuery = await GameDB.NewsArticle.findAll( {
      attributes:
      [
        [ sequelize.fn( 'COUNT', sequelize.col( 'id' ) ), 'totalArticles' ]
      ]

    } );

    // WHY?
    const { totalArticles } = JSON.parse( JSON.stringify( articlesQuery[ 0 ] ) );
    offset = articles.length;
    return {
      articles,
      offset,
      total_articles: totalArticles,
    };
  } catch ( err ) {
    return err;
  }
};
