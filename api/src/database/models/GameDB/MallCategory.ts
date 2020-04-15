import { Model, DataTypes, Association } from 'sequelize';

import { GameDB } from '../..';

import ItemMall from './ItemMall';

export default class MallCategory extends Model {
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
