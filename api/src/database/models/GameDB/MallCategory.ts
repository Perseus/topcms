import { DataTypes, Association, HasManyGetAssociationsMixin } from 'sequelize';

import ItemMall from './ItemMall';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';


export default class MallCategory extends BaseModel {
  public id!: number;
  public name!: string;

  public static associations: {
    mallItems: Association<MallCategory, ItemMall>;
  };

  public getMallItems!: HasManyGetAssociationsMixin<ItemMall>;
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
  },
  total_items: {
    type: DataTypes.VIRTUAL,
    async get(): Promise<number> {
      const items = await this.getMallItems();
      return items.length;
    }
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
