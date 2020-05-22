/* eslint-disable @typescript-eslint/camelcase */

import crypto from 'crypto';
import { DataTypes, Op } from 'sequelize';

import BaseModel from '../../utils/model';
import { AccessLevels } from '../../../types/db';
import { AccountServer } from '../..';

import AccountModel from '../GameDB/Account';

export default class User extends BaseModel {
  public id!: number;
  public name!: string;
  public password!: string;
  public originalPassword!: string;
  public email!: string;
  public login_status!: number;
  public last_login_time!: Date;
  public last_login_ip!: string;
  public last_login_mac!: string;
  public ban!: number;
  public mallPoints!: number;
  public awardCenterPoints: number;
  public accessLevels: AccessLevels[];


  /**
   * Sequelize doesn't support cross-database relations for MSSQL right now.
   * This seems to be the only way to retrieve info from GameDB using AccountServer details.
   *
   */
  async getAccount(): Promise<AccountModel> {
    const accountDetails = await AccountModel.findOne( {
      where: {
        act_id: this.id
      }
    } );

    return accountDetails;
  }

  /**
   * Fetches the "GM" level from the GameDB, returns the access levels that the user is allowed
   *
   * @param accountModel The Account model from GameDB
   */
  async getAccessLevel(): Promise<[AccessLevels]> {
    const accountDetails = await this.getAccount();
    const gmLevel = accountDetails.gm;
    const accessLevels: [AccessLevels] = [ AccessLevels.USER ];

    if ( gmLevel === 99 ) {
      accessLevels.push( AccessLevels.ADMIN );
    }

    if ( gmLevel > 0 ) {
      accessLevels.push( AccessLevels.SITE );
    }

    return accessLevels;
  }

  /**
   * Fetches all accounts that aren't currently banned
   */
  static async getAllUnbannedAccounts(): Promise<Array<User>> {
    const accounts = await this.findAll( {
      where: {
        ban: {
          [ Op.or ]: {
            [ Op.ne ]: 1,
            [ Op.eq ]: null,
          }
        }
      }
    } );
    return accounts;
  }


  matchPassword( password: string ): boolean {
    const passwordHash = crypto.createHash( 'md5' ).update( password ).digest( 'hex' ).toUpperCase();

    return ( passwordHash === this.password );
  }
}

User.init( {
  id: {
    type: DataTypes.DECIMAL,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  originalPassword: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    // validator?
  },
  login_status: DataTypes.DECIMAL,
  last_login_time: DataTypes.DATE,
  last_login_ip: DataTypes.STRING,
  last_login_mac: DataTypes.STRING,
  ban: DataTypes.DECIMAL,
  mallPoints: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  awardCenterPoints: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
}, {
  sequelize: AccountServer,
  tableName: 'account_login',
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: [ 'originalPassword' ],
    }
  }
} );
