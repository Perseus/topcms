import Joi from '@hapi/joi';
import MallCategory from '../../../database/models/GameDB/MallCategory';

import { resolve } from '../../utils/resolver';
import logger from '../../../utils/FileLogger';

/**
 * REQUIRES_ADMIN
 *
 * Creates a commerce category
 *
 * @param {string} name -> The name of the category to create
 */
export const createCommerceCategory = resolve( {
  validationSchema: {
    name: Joi.string().min( 3 ).required(),
  },
  async action( { args, context } ) {
    const { name } = args;
    const response = await MallCategory.create( {
      name
    } );

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${name} created. `, user: context.req.user
    } );

    return {
      data: response
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Edits a commerce category
 *
 * @param {number} id -> ID of the category to edit
 * @param {string} name -> Updated name of the category
 */
export const editCommerceCategory = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    name: Joi.string().min( 3 ).required(),
  },
  async action( { args, context } ) {
    const { id, name } = args;
    const mallCategory = await MallCategory.findOne( {
      where: {
        id
      },
    } );

    mallCategory.set( 'name', name );

    await mallCategory.save();

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${id}. ${name} edited. `, user: context.req.user
    } );

    return {
      data: mallCategory
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Deletes a commerce category
 * @param {number} id -> ID of the category to delete
 */
export const deleteCommerceCategory = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args, context } ) {
    const { id } = args;

    await MallCategory.destroy( {
      where: {
        id
      }
    } );

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${id} deleted. `, user: context.req.user
    } );

    return {
      data: {
        id
      }
    };
  }
} );
