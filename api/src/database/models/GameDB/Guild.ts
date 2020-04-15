/* eslint-disable @typescript-eslint/camelcase */

import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

export default class Guild extends Model {
  public guild_id!: number;
  public guild_name!: string;
  public motto!: string;
  public passwd!: string;
  public leader_id!: number;
  public type!: number;
  public member_total!: number;
}

Guild.init( {
  guild_id: {
    type: DataTypes.DECIMAL,
    primaryKey: true,
    autoIncrement: true,
  },
  guild_name: {
    type: DataTypes.STRING,
    get(): string {
      const guild_name = this.getDataValue( 'guild_name' );
      if ( guild_name === 'Navy HQ' ) {
        return 'N/A';
      }

      return guild_name;
    },
  },
  motto: DataTypes.STRING,
  passwd: DataTypes.STRING,
  leader_id: DataTypes.INTEGER,
  type: DataTypes.INTEGER,
  member_total: DataTypes.INTEGER,

}, {
  timestamps: false,
  tableName: 'guild',
  sequelize: GameDB
} );
