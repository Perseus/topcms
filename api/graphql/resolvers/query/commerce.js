const sequelize = require( 'sequelize' );
const path = require( 'path' );
const { promises, access } = require( 'fs' );

const { AccountServer, GameDB } = require( '../../../database/models' );
const { GeneralConfig } = require( '../../../config' );

async function commerceCategories() {
  try {
    const response = await GameDB.MallCategory.findAll();
    console.log( response );
    return response;
  } catch ( err ) {
    console.log( err );
    return err;
  }
}

async function allMallItems() {
  try {
    const response = await GameDB.ItemMall.findAll();
    return response;
  } catch ( err ) {
    return err;
  }
}


module.exports = {
  commerceCategories,
  allMallItems,
};
