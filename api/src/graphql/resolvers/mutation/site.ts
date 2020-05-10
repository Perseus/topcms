import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import Download from '../../../database/models/GameDB/Download';
import Author from '../../../database/models/GameDB/Author';
import NewsArticle from '../../../database/models/GameDB/NewsArticle';
import { DownloadSections } from '../../../config';


/**
 * REQUIRES_SITE_ADMIN
 *
 * Creates an author with the given name
 *
 * @param {string} name -> Name of the author to create
 */
export const createAuthor = resolve( {
  validationSchema: {
    name: Joi.string().min( 3 ),
  },
  async action( { args } ) {
    const { name } = args;

    await Author.findOne( {
      where: {
        name
      },
      rejectOnEmpty: false,
      rejectOnFound: true
    } );

    const createdAuthor = await Author.create( {
      name
    } );

    return {
      data: createdAuthor
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Edits an existing author
 *
 * @param {number} id -> ID of the author to edit
 * @param {string} name -> New name of the author
 */
export const editAuthor = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    name: Joi.string().min( 3 ),
  },
  async action( { args } ) {
    const { id, name } = args;
    const authorToUpdate = await Author.findOne( {
      where: {
        id
      },
      rejectOnEmpty: true
    } );

    await authorToUpdate.update( {
      name
    } );

    return {
      data: authorToUpdate
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Deletes an existing author
 *
 * @param {number} id -> ID of the author to delete
 */
export const deleteAuthor = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args } ) {
    const { id } = args;
    await Author.destroy( {
      where: {
        id
      }
    } );

    return {
      data: {
        id
      }
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Creates a download item
 *
 * @param {string} title -> Title of the download
 * @param {string} url -> URL the download redirects to
 * @param {number} author -> ID of the author who is creating this download
 * @param {string} version -> Version of the download
 * @param {string} section -> The section under which this download comes (CLIENT, PATCH, OTHER)
 * @param {string} description -> Description of the download
 */
export const createDownload = resolve( {
  validationSchema: {
    title: Joi.string().min( 3 ),
    url: Joi.string().uri(),
    author: Joi.number().required(),
    version: Joi.string().required(),
    section: Joi.string().valid( ...DownloadSections ),
    description: Joi.string().required(),
  },
  async action( { args } ) {
    const {
      title, url, author, version, section, description
    } = args;

    const createdDownload = await Download.create( {
      title,
      url,
      version,
      section,
      description,
      author_id: author
    }, {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    return {
      data: createdDownload
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Updates a download item
 *
 * @param {number} id -> ID of the download to upload
 * @param {string} title -> Title of the download
 * @param {string} url -> URL the download redirects to
 * @param {number} author -> ID of the author who is creating this download
 * @param {string} version -> Version of the download
 * @param {string} section -> The section under which this download comes (CLIENT, PATCH, OTHER)
 * @param {string} description -> Description of the download
 */
export const editDownload = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    title: Joi.string().min( 3 ).optional(),
    url: Joi.string().uri().optional(),
    author: Joi.number().optional(),
    version: Joi.string().optional(),
    section: Joi.string().valid( ...DownloadSections ).optional(),
    description: Joi.string().optional(),
  },
  async action( { args } ) {
    const {
      id
    } = args;

    const downloadToUpdate = await Download.findOne( {
      where: {
        id
      },
      rejectOnEmpty: true
    } );

    downloadToUpdate.set( args );

    await downloadToUpdate.save();
    await downloadToUpdate.reload( {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    return {
      data: downloadToUpdate
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Deletes an existing download item
 *
 * @param {number} id -> ID of the download to delete
 */
export const deleteDownload = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args } ) {
    const { id } = args;

    await Download.destroy( {
      where: {
        id
      },
    } );

    return {
      data: {
        id
      }
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Creates a new News Article
 *
 * @param {object} input -> Input object containing:
 *    @param {string} title -> Title of the News Article
 *    @param {string} content -> Content of the News Article
 *    @param {string} author_id -> ID of the author that created this article
 */
export const createNewsArticle = resolve( {
  validationSchema: {
    input: Joi.object( {
      title: Joi.string().min( 3 ).required(),
      content: Joi.string().min( 5 ).required(),
      author_id: Joi.number().required()
    } ),
  },
  async action( { args } ) {
    const {
      input: {
        title, content, author
      }
    } = args;

    const newsArticle = await NewsArticle.create( {
      title,
      content,
      author_id: author
    }, {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    return {
      data: newsArticle
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Deletes an existing News Article
 *
 * @param {number} id -> ID of the article to delete
 */
export const deleteNewsArticle = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args } ) {
    const { id } = args;
    await NewsArticle.destroy( {
      where: {
        id
      }
    } );

    return {
      data: {
        id
      }
    };
  }
} );

/**
 * REQUIRES_SITE_ADMIN
 *
 * Updates an existing news article
 *
 * @param {object} input -> Input object containing:
 *    @param {number} id -> ID of the news article to update
 *    @param {string} title -> Title of the News Article
 *    @param {string} content -> Content of the News Article
 *    @param {string} author_id -> ID of the author that created this article
 */
export const editNewsArticle = resolve( {
  validationSchema: {
    input: Joi.object( {
      id: Joi.number().required(),
      title: Joi.string().min( 3 ).optional(),
      content: Joi.string().optional(),
      author: Joi.string().optional()
    } )
  },
  async action( { args } ) {
    const {
      input: {
        id
      }
    } = args;

    const articleToUpdate = await NewsArticle.findOne( {
      where: {
        id
      },
      rejectOnEmpty: true
    } );

    articleToUpdate.set( args.input );

    await articleToUpdate.save();
    await articleToUpdate.reload( {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    return {
      data: articleToUpdate
    };
  }
} );
