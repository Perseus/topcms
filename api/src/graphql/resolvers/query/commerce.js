const sequelize = require( 'sequelize' );
const path = require( 'path' );
const { promises, access } = require( 'fs' );

const { AccountServer, GameDB } = require( '../../../database/models' );
const { GeneralConfig } = require( '../../../config' );

module.exports.commerceCategories = async function() {
  try {
    const response = await GameDB.MallCategory.findAll();
    console.log( response );
    return response;
  } catch ( err ) {
    console.log( err );
    return err;
  }
};
