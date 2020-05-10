import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import Download from '../../../database/models/GameDB/Download';
import Author from '../../../database/models/GameDB/Author';
import NewsArticle from '../../../database/models/GameDB/NewsArticle';

/**
 * Returns a list of all NewsArticles in the DB
 */
export const newsArticles = resolve( {
  async action() {
    const result = await NewsArticle.findAll( {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );
    return {
      data: result,
    };
  }
} );

/**
 * Returns a list of all the Downloads in the DB
 */
export const downloads = resolve( {
  async action() {
    const result = await Download.findAll( {
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    return {
      data: result,
    };
  },
} );

/**
 * Returns a list of all the Authors in the DB
 */
export const authors = resolve( {
  async action() {
    const result = await Author.findAll( {
      include: [
        {
          model: NewsArticle,
        },
        {
          model: Download,
        }
      ]
    } );

    return {
      data: result
    };
  }
} );
/**
 * Returns data about a single download
 *
 * @param {number} id -> ID of the download to look for
 */
export const download = resolve( {
  validationSchema: {
    id: Joi.number().exist(),
  },
  async action( { args } ) {
    const { id } = args;
    const result = await Download.findOne( {
      where: {
        id
      },
      include: [
        {
          model: Author,
          as: 'author'
        }
      ],
      rejectOnEmpty: true
    } );

    return {
      data: result
    };
  }
} );

/**
 * Returns data about a single news article
 *
 * @param {number} id -> ID of the news article to look for
 */
export const newsArticle = resolve( {
  validationSchema: {
    id: Joi.number().exist(),
  },
  async action( { args } ) {
    const { id } = args;
    const result = await NewsArticle.findOne( {
      where: {
        id,
      },
      include: [
        {
          model: Author,
          as: 'author'
        }
      ],
      rejectOnEmpty: true
    } );

    return {
      data: result
    };
  }
} );

/**
 * Returns a number of news articles based on the offset
 *
 * @param {number} offset -> DB lookup offset
 * @param {number} limit -> The max number of articles to return
 */
export const newsFeed = resolve( {
  validationSchema: {
    offset: Joi.number().default( 0 ),
    limit: Joi.number().default( 10 ),
  },
  async action( { args } ) {
    const { offset, limit } = args;
    const articles = await NewsArticle.findAndCountAll( {
      order: [
        [ 'updatedAt', 'DESC' ]
      ],
      offset,
      limit,
      include: [
        {
          model: Author,
          as: 'author'
        }
      ]
    } );

    const { rows, count } = articles;
    return {
      data: {
        articles: rows,
        offset: rows.length,
        totalArticles: count,
      }
    };
  }
} );
