import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import MallCategory from '../../../database/models/GameDB/MallCategory';
import ItemMall from '../../../database/models/GameDB/ItemMall';

/**
 * Fetches all existing commerce categories
 */
export const commerceCategories = resolve( {
  async action() {
    const response = await MallCategory.findAll();
    return {
      data: response
    };
  }
} );

/**
 * Fetches one commerce item
 *
 * @param {number} id -> ID of the commerce item to fetch
 */
export const commerceItem = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args } ) {
    const { id } = args;

    const item = await ItemMall.findOne( {
      where: {
        id
      },
      include: [
        {
          model: MallCategory,
          as: 'category'
        }
      ]
    } );

    return {
      data: item
    };
  }
} );

/**
 * Fetches all commerce items
 */

export const commerceItems = resolve( {
  async action() {
    const items = await ItemMall.findAll( {
      include: [
        {
          model: MallCategory,
          as: 'category'
        }
      ]
    } );

    return {
      data: items
    };
  }
} );
