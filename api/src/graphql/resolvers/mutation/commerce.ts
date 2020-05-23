import Joi from '@hapi/joi';

import MallCategory from '../../../database/models/GameDB/MallCategory';
import ItemMall from '../../../database/models/GameDB/ItemMall';
import User from '../../../database/models/AccountServer/User';

import { resolve } from '../../utils/resolver';
import logger from '../../../utils/FileLogger';
import TError from '../../../utils/TError';
import { MallTypes } from '../../../config';

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

/**
 * REQUIRES_ADMIN
 *
 * Creates a commerce item (for item mall or award center)
 * @param {number} itemId -> The Iteminfo ID of the item that this entry "sells"
 * @param {number} price -> The price of the item
 * @param {number} numOfItems -> The quantity of the item that will be given to the player on purchase
 * @param {number} availableQuantity -> If not -1, this quantity will go down every time a player purchases it.
 * @param {number} categoryId -> The commerce category that this item comes under
 * @param {string} mallType -> 'MALL' or 'CREDIT'. Which type of commerce this item will be shown under.
 *
 */
export const createCommerceItem = resolve( {
  validationSchema: {
    itemId: Joi.number().required(),
    price: Joi.number().required(),
    numOfItems: Joi.number().default( 1 ),
    availableQuantity: Joi.number().default( -1 ),
    categoryId: Joi.number().required(),
    mallType: Joi.string().allow( 'MALL', 'CREDIT' ).required(),
  },
  async action( { args, context } ) {
    const {
      itemId, price, availableQuantity, categoryId, mallType, numOfItems
    } = args;

    const response = await ItemMall.create( {
      itemId,
      price,
      numOfItems,
      availableQuantity,
      category_id: categoryId,
      mallType
    } );

    const item = await ItemMall.findOne( {
      where: {
        id: response.id
      },
      include: [
        {
          model: MallCategory,
          as: 'category'
        }
      ]
    } );

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${itemId} added. `, user: context.req.user
    } );

    return {
      data: item
    };
  }
} );


/**
 * REQUIRES_ADMIN
 *
 * Edits an existing commerce item (for item mall or award center)
 * @param {number} id -> The ID of the item to edit
 * @param {number} itemId -> The Iteminfo ID of the item that this entry "sells"
 * @param {number} price -> The price of the item
 * @param {number} numOfItems -> The quantity of the item that will be given to the player on purchase
 * @param {number} availableQuantity -> If not -1, this quantity will go down every time a player purchases it.
 * @param {number} categoryId -> The commerce category that this item comes under
 * @param {string} mallType -> 'MALL' or 'CREDIT'. Which type of commerce this item will be shown under.
 *
 */

export const editCommerceItem = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    itemId: Joi.number().optional(),
    price: Joi.number().optional(),
    numOfItems: Joi.number().optional(),
    availableQuantity: Joi.number().optional(),
    categoryId: Joi.number().optional(),
    mallType: Joi.string().allow( 'MALL', 'CREDIT' ).optional(),
  },

  async action( { args, context } ) {
    const {
      id
    } = args;

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

    item.set( args );

    await item.save();
    await item.reload();

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${id} edited. `, user: context.req.user
    } );
    return {
      data: item
    };
  }
} );

export const deleteCommerceItem = resolve( {
  validationSchema: {
    id: Joi.number().required(),
  },
  async action( { args, context } ) {
    const { id } = args;

    const item = await ItemMall.findOne( {
      where: {
        id
      }
    } );

    await item.destroy();

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${item.id} deleted. `, user: context.req.user
    } );

    return {
      data: item
    };
  }
} );

export const purchaseCommerceItem = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    quantity: Joi.number().required(),
  },
  async action( { args, context } ) {
    const { req } = context;
    const userId = req.user.id;
    const { id, quantity } = args;

    const itemBeingPurchased = await ItemMall.findOne( {
      where: {
        id
      }
    } );

    if ( quantity <= 0 ) {
      throw new TError( {
        code: 'input.INVALID_QUANTITY',
        message: 'Invalid quantity for purchase provided'
      } );
    }

    if ( itemBeingPurchased.availableQuantity !== -1 && itemBeingPurchased.availableQuantity < quantity ) {
      throw new TError( {
        code: 'itemmall.INSUFFICIENT_QUANTITY',
        message: 'Item doesn\'t have enough available quantity',
      } );
    }

    const user = await User.findOne( {
      where: {
        id: userId
      }
    } );

    const totalItemPrice = quantity * itemBeingPurchased.price;

    const isItemForItemMall = ( itemBeingPurchased.mallType === MallTypes.MALL );
    const pointsToCheck = ( isItemForItemMall ? user.mallPoints : user.awardCenterPoints );

    if ( pointsToCheck < totalItemPrice ) {
      throw new TError( {
        code: 'user.NOT_ENOUGH_POINTS',
        message: 'User does not have enough points to purchase this item',
        params: {
          mallType: itemBeingPurchased.mallType,
          itemId: id
        }
      } );
    }

    if ( isItemForItemMall ) {
      user.mallPoints -= totalItemPrice;
    } else {
      user.awardCenterPoints -= totalItemPrice;
    }

    await user.save();

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Item ${itemBeingPurchased.id} bought. Quantity: ${quantity}`, user: req.user
    } );

    // TODO: Storage box logic here.


    if ( itemBeingPurchased.availableQuantity !== -1 ) {
      itemBeingPurchased.availableQuantity -= quantity;

      await itemBeingPurchased.save();
    }

    return {
      data: {
        item: itemBeingPurchased,
        user,
      }
    };
  }
} );
