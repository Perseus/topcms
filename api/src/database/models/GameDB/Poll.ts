import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

export default class Poll extends Model {
  public id!: number;
  public title!: string;
  public options!: string;
  public votes!: string;
}

Poll.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  options: DataTypes.STRING,
  votes: DataTypes.STRING,
}, {
  sequelize: GameDB
} );
