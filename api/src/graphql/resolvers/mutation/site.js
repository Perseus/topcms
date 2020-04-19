const { UserInputError } = require( 'apollo-server' );
const { composeGraphQLError } = require( '../../../helpers/errorHandler' );
const { GeneralConfig } = require( '../../../config' );

module.exports.createAuthor = async function createAuthor( object, args, context, info ) {
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
};

module.exports.editAuthor = async function editAuthor( object, args, context, info ) {
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
    }
    return 'UPDATE_FAILED';
  } catch ( err ) {
    return err;
  }
};

module.exports.deleteAuthor = async function deleteAuthor( object, args, context, info ) {
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
};

module.exports.createDownload = async function createDownload( object, args, context, info ) {
  const {
    title, url, author, version, section, description
  } = args;

  if ( !GeneralConfig.DOWNLOAD_SECTIONS.includes( section ) ) {
    throw new UserInputError( 'Invalid download section' );
  }

  try {
    const createdDownload = await GameDB.Download.create( {
      title,
      url,
      version,
      section,
      description,
      author_id: author,
    } );
    createdDownload.author = await createdDownload.getAuthor();
    return createdDownload;
  } catch ( err ) {
    err = composeGraphQLError( err, 'download', 'create' );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
};

module.exports.editDownload = async function editDownload( object, args, context, info ) {
  const {
    id, title, url, author, version, section, description
  } = args;

  if ( !GeneralConfig.DOWNLOAD_SECTIONS.includes( section ) ) {
    throw new UserInputError( 'Invalid download section' );
  }

  try {
    const downloadUpdated = await GameDB.Download.update( {
      title,
      url,
      version,
      section,
      description,
      author_id: author
    }, {
      where: {
        id
      }
    } );
    if ( downloadUpdated ) {
      const download = await GameDB.Download.findOne( { where: { id }, include: [ { model: GameDB.Author, as: 'author' } ] } );
      return download;
    }
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ 'DOWNLOAD_UPDATE_FAILED' ] } );
  } catch ( err ) {
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
};


module.exports.deleteDownload = async function deleteDownload( object, args, context, info ) {
  const { id } = args;
  try {
    const deletedDownload = await GameDB.Download.destroy( {
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
};

module.exports.createNewsArticle = async function createNewsArticle( object, args, context, info ) {
  try {
    const { input: { title, content, author } } = args;
    const createdNewsArticle = await GameDB.NewsArticle.create( {
      title,
      content,
      author_id: author
    } );

    if ( createdNewsArticle ) {
      createdNewsArticle.author = await createdNewsArticle.getAuthor();
      return createdNewsArticle;
    }

    return null;
  } catch ( err ) {
    err = composeGraphQLError( err, 'newsArticle', 'create' );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
};

module.exports.deleteNewsArticle = async function deleteNewsArticle( object, args ) {
  try {
    const { id } = args;
    const deletedNewsArticle = await GameDB.NewsArticle.destroy( {
      where: {
        id
      }
    } );
    if ( deletedNewsArticle ) {
      return { id };
    }
  } catch ( err ) {
    err = composeGraphQLError( err, 'newsArticle', 'delete' );
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
};


module.exports.editNewsArticle = async function editNewsArticle( object, args ) {
  const {
    input: {
      id, title, content, author
    }
  } = args;
  try {
    const updatedNewsArticle = await GameDB.NewsArticle.update( {
      title,
      content,
      author_id: author
    }, {
      where: {
        id
      }
    } );
    if ( updatedNewsArticle ) {
      const newsArticle = await GameDB.NewsArticle.findOne( { where: { id }, include: [ { model: GameDB.Author, as: 'author' } ] } );
      return newsArticle;
    }
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ 'NEWS_ARTICLE_UPDATE_FAILED' ] } );
  } catch ( err ) {
    throw new UserInputError( 'INVALID_INPUT', { validationErrors: [ err ] } );
  }
};
