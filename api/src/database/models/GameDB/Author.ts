import { DataTypes, Association } from 'sequelize';


import NewsArticle from './NewsArticle';
import Poll from './Poll';
import Download from './Download';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';

export default class Author extends BaseModel {
  public id!: number;
  public name!: string;

  public static associations: {
    news_articles: Association<Author, NewsArticle>;
    polls: Association<Author, Poll>;
    downloads: Association<Author, Download>;
  };
}

Author.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  underscored: true,
  sequelize: GameDB
} );


// ASSOCIATIONS

Author.hasMany( NewsArticle, {
  foreignKey: 'author_id'
} );

Author.hasMany( Poll, {
  foreignKey: 'author_id'
} );

Author.hasMany( Download, {
  foreignKey: 'author_id'
} );

NewsArticle.belongsTo( Author, {
  targetKey: 'id',
  foreignKey: 'author_id',
  as: 'author'
} );

Poll.belongsTo( Author, {
  targetKey: 'id',
  foreignKey: 'author_id',
  as: 'author'
} );

Download.belongsTo( Author, {
  targetKey: 'id',
  foreignKey: 'author_id',
  as: 'author'
} );
