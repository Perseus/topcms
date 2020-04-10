const path = require( 'path' );

const ItemInfoParser = require( '../../../utils/ItemInfoParser' );
const { ItemInfoAttributeMap } = require( '../../../config/ItemInfoItemAttributes' );
const { GameDB } = require( '../../../database/models/' );

const User = {

  async account_details( obj, info, context ) {
    const userID = obj.id;
    if ( userID ) {
      try {
        const accountDetails = await GameDB.Account.findOne( {
          where: {
            act_id: userID
          }
        } );
        return accountDetails;
      } catch ( err ) {
        return err;
      }
    }
    return null;
  },

  async character_details( obj, info, context ) {
    const accountID = obj.id;
    if ( accountID ) {
      try {
        const characterDetails = await GameDB.Character.findAll( {
          where: {
            act_id: accountID,
            delflag: 0,
          }
        } );

        return characterDetails;
      } catch ( err ) {
        return err;
      }
    }
    return null;
  }

};

const CommerceListItem = {
  async name( obj, info, context ) {
    const { itemId } = obj;
    if ( !itemId ) {
      return `No item id given ${itemId}`;
    }
    const itemInfoParser = new ItemInfoParser( {}, 'data' );
    const itemData = await itemInfoParser.getItemInformation( itemId, { shouldParseJSON: true } );
    if ( !itemData ) {
      return 'N/A';
    }

    return itemData[ ItemInfoAttributeMap.NAME ];
  },

  categoryId( obj ) {
    return obj.category_id;
  },

  mallType( obj ) {
    return obj.mall_type;
  }
};


module.exports = {
  User,
  CommerceListItem
};
