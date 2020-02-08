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


module.exports = {
  createCommerceCategory,
  editCommerceCategory,
  deleteCommerceCategory
};