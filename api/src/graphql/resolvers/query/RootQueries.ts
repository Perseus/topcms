import path from 'path';

import TError from '../../../utils/TError';
import Account from '../../../database/models/GameDB/Account';
import Character from '../../../database/models/GameDB/Character';
import UserModel from '../../../database/models/AccountServer/User';
import ItemMall from '../../../database/models/GameDB/ItemMall';
import ItemInfoParser from '../../../utils/ItemInfoParser';

/**
 * These are properties on the User object that aren't a part of the database but we allow querying.
 */
export const User = {
  /**
   * Fetches account details from GameDB for a User
   */
  async account_details( obj: UserModel ): Promise<Account> {
    const userId = obj.id;
    if ( userId ) {
      try {
        const accountDetails = await Account.findOne( {
          where: {
            act_id: userId
          }
        } );
        return accountDetails;
      } catch ( err ) {
        return null;
      }
    }

    return null;
  },

  /**
   * Fetches character details from GameDB for a User
   */
  async character_details( obj: UserModel ): Promise<Character[]> {
    const accountID = obj.id;
    if ( accountID ) {
      try {
        // TODO: This doesn't take into account multiple GameDBs (multiple server instances)
        const characterDetails = await Character.findAll( {
          where: {
            act_id: accountID,
            delflag: 0
          }
        } );
        return characterDetails;
      } catch ( err ) {
        return null;
      }
    }

    return null;
  }
};


export const CommerceItem = {

  /**
   * Fetches ItemInfo data for an item
   */
  async itemInfo( obj: ItemMall ): Promise<Record<string, string>> {
    const { itemId } = obj;
    const dataDir = path.join( __dirname, '..', '..', '..', 'data' );
    const itemInfoParser = new ItemInfoParser( '', dataDir );

    const itemData = await itemInfoParser.getItemInformation( itemId );
    return JSON.parse( itemData );
  }
};
