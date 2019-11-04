const { GameDB } = require( '../../../database/models/' );

module.exports.User = {

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
