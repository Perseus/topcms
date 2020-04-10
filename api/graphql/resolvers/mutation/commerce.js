const sequelize = require( 'sequelize' );
const path = require( 'path' );

const { AccountServer, GameDB } = require( '../../../database/models' );
const logger = require( '../../../utils/FileLogger' );

async function createCommerceCategory( obj, args, context ) {
  try {
    const { name } = args;
    const response = await GameDB.MallCategory.create( {
      name,
    } );

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${name} created. `, user: context.req.user
    } );

    return response;
  } catch ( err ) {
    return err;
  }
}


async function editCommerceCategory( obj, args, context ) {
  try {
    const { id, name } = args;
    await GameDB.MallCategory.update( {
      name
    }, {
      where: {
        id
      }
    } );

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${id}. ${name} edited. `, user: context.req.user
    } );
    const retrievedCategory = await GameDB.MallCategory.findOne( {
      where: {
        id
      }
    } );

    return retrievedCategory;
  } catch ( err ) {
    return err;
  }
}

async function deleteCommerceCategory( obj, args, context ) {
  try {
    const { id } = args;

    await GameDB.MallCategory.destroy( {
      where: {
        id
      }
    } );

    logger.log( {
      type: 'commerceCategory', level: 'debug', message: `Commerce category ${id} deleted. `, user: context.req.user
    } );
    return { id };
  } catch ( err ) {
    return err;
  }
}

async function createCommerceItem( obj, args, context ) {
  try {
    // itemId: Int!, price: Int!, availableQuantity: Int!, category_id: ID!, mall_type: MallTypes!
    const {
      itemId, price, availableQuantity, categoryId, mallType
    } = args;

    const createdItem = await GameDB.ItemMall.create( {
      itemId,
      price,
      availableQuantity: availableQuantity || -1,
      category_id: categoryId,
      mall_type: mallType
    } );

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${createdItem.id} created. `, user: context.req.user
    } );

    return createdItem;
  } catch ( err ) {
    return err;
  }
}

async function editCommerceItem( obj, args, context ) {
  try {
    const { id } = args;
    const updateObject = {};

    [ 'itemId', 'price', 'availableQuantity', 'categoryId', 'mallType' ].forEach( ( possibleArg ) => {
      if ( args[ possibleArg ] ) {
        updateObject[ possibleArg ] = args[ possibleArg ];
      }
    } );

    const updatedItem = await GameDB.ItemMall.update( updateObject, { where: { id } } );
    const retrievedItem = await GameDB.ItemMall.findOne( { id } );

    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${updatedItem.id} updated. `, user: context.req.user
    } );

    return retrievedItem;
  } catch ( err ) {
    return err;
  }
}

async function deleteCommerceItem( obj, args, context ) {
  try {
    const { id } = args;
    await GameDB.ItemMall.destroy( {
      id
    } );


    logger.log( {
      type: 'commerceItem', level: 'debug', message: `Commerce item ${id} deleted. `, user: context.req.user
    } );
    return { id };
  } catch ( err ) {
    return err;
  }
}

module.exports = {
  createCommerceCategory,
  editCommerceCategory,
  deleteCommerceCategory,

  createCommerceItem,
  editCommerceItem,
  deleteCommerceItem
};
