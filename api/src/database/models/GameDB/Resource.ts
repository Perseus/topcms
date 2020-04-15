/* eslint-disable @typescript-eslint/camelcase */

import { Model, DataTypes } from 'sequelize';

import { GameDB } from '../..';

import InventoryParser from '../../../utils/InventoryParser';

export default class Resource extends Model {
  public id!: number;
  public cha_id!: number;
  public type_id!: number;
  public content!: string;
}

Resource.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cha_id: DataTypes.INTEGER,
  type_id: DataTypes.INTEGER,
  content: {
    type: DataTypes.TEXT,
    async get(): Promise<string> {
      const inventoryType = this.getDataValue( 'type_id' );
      const inventoryContent = this.getDataValue( 'content' );
      const inventory = new InventoryParser( inventoryType, inventoryContent );

      const parsedInventory = await inventory.getParsedInventory();
      return JSON.stringify( parsedInventory );
    },
  },
}, {
  timestamps: false,
  tableName: 'Resource',
  sequelize: GameDB
} );
