import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { GameDB } from '../..';
import type { Author } from '../../../types/db/models';

export default class Poll extends Model {
  public id!: number;
  public title!: string;
  public options!: string;
  public votes!: string;

  public getAuthor!: BelongsToGetAssociationMixin<Author>;
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
