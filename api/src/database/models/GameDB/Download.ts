import { Model, DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';
import type { Author } from '../../../types/db/models';

export default class Download extends BaseModel {
  public id!: number;
  public title!: string;
  public url!: string;
  public section!: string;
  public version!: string;
  public description!: string;

  public getAuthor!: BelongsToGetAssociationMixin<Author>;
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
