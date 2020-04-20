import { DataTypes, BelongsToGetAssociationMixin } from 'sequelize';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';
import type { Author } from '../../../types/db/models';

export default class NewsArticle extends BaseModel {
  public id!: number;
  public title!: string;
  public content!: string;

  public getAuthor!: BelongsToGetAssociationMixin<Author>;
}

NewsArticle.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
}, {
  sequelize: GameDB,
} );
