/* eslint-disable @typescript-eslint/camelcase */

import { DataTypes, Association, HasManyGetAssociationsMixin } from 'sequelize';
import Character from './Character';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';

import type { User } from '../../../types/db/models';
import { AccessLevels } from '../../../types/db';

class Account extends BaseModel {
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

  public getCharacters!: HasManyGetAssociationsMixin<Character>;

  async getAccountDetails( UserModel: typeof User, attributes: Array<string> ): Promise<User> {
    try {
      let accountDetails: User;
      if ( attributes && attributes.length > 0 ) {
        accountDetails = await UserModel.findOne( {
          where: {
            id: this.act_id
          },
          attributes
        } );
      } else {
        accountDetails = await UserModel.findOne( {
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

  async resetSecurityCode(): Promise<void> {
    this.set( 'password', '' );
    await this.save();
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
  password: DataTypes.STRING,
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
