import { GameDB } from '../../../database/models/';

export const User = {
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
  }
};
