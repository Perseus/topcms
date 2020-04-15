/* eslint-disable @typescript-eslint/camelcase */

import {
  Model, DataTypes, Op, Association
} from 'sequelize';

import { GameDB } from '../..';

import { AccessLevels } from '../../../types/db';
import User from '../AccountServer/User';
import Character from './Character';

class Account extends Model {
  public act_id!: number;
  public act_name!: string;
  public gm!: number;
  public cha_ids!: string;
  public last_ip!: string;
  public password!: string;

  public readonly characters?: Character[];

  public static associations: {
    characters: Association<Account, Character>;
  }

  async getAccountDetails( attributes: Array<string> ): Promise<User> {
    try {
      let accountDetails: User;

      if ( attributes && attributes.length > 0 ) {
        accountDetails = await User.findOne( {
          where: {
            id: this.act_id
          },
          attributes
        } );
      } else {
        accountDetails = await User.findOne( {
          where: {
            id: this.act_id
          }
        } );
      }

      return accountDetails;
    } catch ( err ) {
      return null;
    }
  }
}


Account.init( {
  act_id: {
    type: DataTypes.DECIMAL,
    primaryKey: true,
  },
  act_name: {
    type: DataTypes.STRING,
    // validator
  },
  gm: DataTypes.DECIMAL,
  cha_ids: DataTypes.STRING,
  last_ip: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  tableName: 'account',
  timestamps: false,
  sequelize: GameDB,
  getterMethods: {
    access_levels(): AccessLevels[] {
      const gmLevel = this.getDataValue( 'gm' );
      const accessLevels = [ AccessLevels.USER ];

      if ( gmLevel === 99 ) {
        accessLevels.push( AccessLevels.ADMIN );
      }

      if ( gmLevel > 0 ) {
        accessLevels.push( AccessLevels.SITE );
      }

      return accessLevels;
    }
  }
} );

Account.hasMany( Character, {
  foreignKey: 'act_id',
  as: 'characters'
} );

Character.belongsTo( Account, {
  targetKey: 'act_id',
  foreignKey: 'act_id',
  as: 'account'
} );

export default Account;
