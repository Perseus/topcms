import { DataTypes, Association } from 'sequelize';

import ItemMall from './ItemMall';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';


export default class MallCategory extends BaseModel {
  public id!: number;
  public name!: string;

  public static associations: {
    mallItems: Association<MallCategory, ItemMall>;
  };
}

MallCategory.init( {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
  }
}, {
  sequelize: GameDB,
  tableName: 'MallCategories',
  timestamps: false
} );

MallCategory.hasMany( ItemMall, {
  foreignKey: 'category_id',
  as: 'mallItems'
} );

ItemMall.belongsTo( MallCategory, {
  targetKey: 'id',
  foreignKey: 'category_id',
  as: 'category'
} );
