import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

import BaseModel from '../../utils/model';

export default class ItemMall extends BaseModel {
  public id!: number;
  public itemId!: number;
  public price!: number;
  public availableQuantity!: number;
  public category_id!: number;
  public mallType!: string;
  public numOfItems!: number;
  public createdAt!: Date;
  public updatedAt: Date;
}

ItemMall.init( {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  itemId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  numOfItems: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  availableQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: -1,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  mallType: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: 'ItemMall',
  sequelize: GameDB,
} );
