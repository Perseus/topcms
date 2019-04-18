'use strict'
import crypto from 'crypto';
import { isUnique } from '../../validators/validators';
import { access } from 'fs';

export default ( sequelize, DataTypes ) => {
  const User = sequelize.define( 'User', {
    id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isUnique: ( value ) => isUnique( User, 'name', value ),
      }
    },
    password: DataTypes.STRING,
    originalPassword: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isUnique: ( value ) => isUnique( User, 'email', value ),
      }
    },
    login_status: DataTypes.DECIMAL,
    last_login_time: DataTypes.DATE,
    last_login_ip: DataTypes.STRING,
    last_login_mac: DataTypes.STRING,
    ban: DataTypes.DECIMAL
  }, {
    tableName: 'account_login',
    timestamps: false,
  } );

  User.prototype.getAccessLevel = async function( accountModel ) {
    const accountDetails = await this.getAccount( accountModel )
    const gmLevel = accountDetails.gm;
    let accessLevels = [];

    if ( gmLevel === 99 ) {
      accessLevels.push( 'ADMIN' );
    }

    if ( gmLevel > 0 && gmLevel < 99 ) {
      accessLevels.push( 'SITE' );
    }

    accessLevels.push( 'USER' )

    return accessLevels;
  }
  /**
   * Sequelize doesn't support cross-database relations for MSSQL right now.
   * This seems to be the only way to retrieve info from GameDB using AccountServer details.
   * 
   */
  User.prototype.getAccount = async function( accountModel ) {
    const accountDetails = await accountModel.findOne( {
      where: {
        act_id: this.id,
      },
    } );
    return accountDetails;
  }

  User.beforeCreate( ( model, options ) => {
    return new Promise( ( resolve, reject ) => {
      try {
        const hashedPassword = crypto.createHash( 'md5' ).update( model.originalPassword ).digest( 'hex' ).toUpperCase();
        model.password = hashedPassword;
        resolve();
      } catch ( err ) {
        reject( err );
      }
    } );
  } );
  return User;
};
