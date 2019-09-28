
;
import { isUnique } from '../../validators/validators';

export default ( sequelize, DataTypes ) => {
  const Account = sequelize.define( 'Account', {

    act_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true
    },
    act_name: {
      type: DataTypes.STRING,
      validate: {
        isUnique: value => isUnique( Account, 'act_name', value )
      },
    },
    gm: DataTypes.DECIMAL,
    cha_ids: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'account',
    timestamps: false,
    getterMethods: {
      access_levels() {
        const gmLevel = this.getDataValue( 'gm' );
        const accessLevels = [];

        if ( gmLevel === 99 ) {
          accessLevels.push( 'ADMIN' );
        }

        if ( gmLevel > 0 ) {
          accessLevels.push( 'SITE' );
        }

        accessLevels.push( 'USER' );

        return accessLevels;
      }
    }
  } );

  Account.prototype.getAccountDetails = async function( accountServerModel, attributes ) {
    try {
      let accountDetails = {};

      if ( attributes && attributes.length > 0 ) {
        accountDetails = await accountServerModel.User.findOne( {
          where: {
            id: this.act_id
          },
          attributes,
        } );
      } else {
        accountDetails = await accountServerModel.User.findOne( {
          where: {
            id: this.act_id
          },
        } );
      }

      return accountDetails;
    } catch ( err ) {
      return null;
    }
  };

  Account.associate = function( models ) {
    // associations can be defined here
    this.hasMany( models.Character, {
      foreignKey: 'act_id',
    } );
  };

  return Account;
};
