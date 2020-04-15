import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

export default class Download extends Model {
  public id!: number;
  public title!: string;
  public url!: string;
  public section!: string;
  public version!: string;
  public description!: string;
}

Download.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  url: DataTypes.STRING,
  section: DataTypes.STRING,
  version: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  sequelize: GameDB
} );
