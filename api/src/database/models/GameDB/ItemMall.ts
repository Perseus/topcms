import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

export default class ItemMall extends Model {
  public id!: number;
  public itemId!: number;
  public price!: number;
  public availableQuantity!: number;
  public category_id!: number;
  public mall_type!: string;
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
    type: DataTypes.INTEGER,
  },
  availableQuantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    default: -1,
  },
  category_id: {
    type: DataTypes.INTEGER,
  },
  mall_type: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}, {
  tableName: 'ItemMall',
  sequelize: GameDB
} );
