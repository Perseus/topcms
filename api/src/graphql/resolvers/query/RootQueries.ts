import TError from '../../../utils/TError';
import Account from '../../../database/models/GameDB/Account';
import Character from '../../../database/models/GameDB/Character';

/**
 * These are properties on the User object that aren't a part of the database but we allow querying.
 */
export const User = {
  /**
   * Fetches account details from GameDB for a User
   */
  async account_details( obj: ResolverSuccessResponse ): Promise<Account> {
    const userId = obj.data.id;
    if ( userId ) {
      try {
        const accountDetails = await Account.findOne( {
          where: {
            act_id: userId
          }
        } );
        return accountDetails;
      } catch ( err ) {
        throw new TError( {
          code: 'user.NO_ACCOUNT_ENTRY',
          message: 'User doesn\'t have an Account entry'
        } );
      }
    }

    return null;
  },

  /**
   * Fetches character details from GameDB for a User
   */
  async character_details( obj: ResolverSuccessResponse ): Promise<Character[]> {
    const accountID = obj.data.id;
    if ( accountID ) {
      try {
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
