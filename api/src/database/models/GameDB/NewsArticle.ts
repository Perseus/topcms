import { Model, DataTypes } from 'sequelize';
import { GameDB } from '../..';

export default class NewsArticle extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
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
