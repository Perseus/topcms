/* eslint-disable @typescript-eslint/camelcase */

import { Model, DataTypes } from 'sequelize';
import { GameDB } from '../..';

export default class StatLog extends Model {
  public track_date!: string;
  public login_num!: number;
  public play_num!: number;
}

StatLog.init( {
  track_date: {
    type: DataTypes.STRING,
  },
  login_num: {
    type: DataTypes.INTEGER,
  },
  play_num: DataTypes.INTEGER,
}, {
  tableName: 'stat_log',
  timestamps: false,
  sequelize: GameDB
} );
