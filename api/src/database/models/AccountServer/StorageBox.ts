import { DataTypes } from 'sequelize';
import path from 'path';

import BaseModel from '../../utils/model';
import { AccountServer } from '../../index';
import ItemInfoParser from '../../../utils/ItemInfoParser';

export default class StorageBox extends BaseModel {
  public id!: number;
  public items!: string;
  public parsedItems!: Record<string, string>[];
  public act_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

StorageBox.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  act_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  parsedItems: {
    type: DataTypes.VIRTUAL,
    async get(): Promise<Record<string, string>[]> {
      const items: string = this.getDataValue( 'items' );
      const dataDir = path.join( __dirname, '..', '..', '..', 'data' );
      const itemInfoParser = new ItemInfoParser( null, dataDir );
      const finalItemsData = [];
      const splitItems = items.split( ';' );

      for ( let i = 0; i < splitItems.length; i++ ) {
        const splitItem = splitItems[ i ];
        const [ itemId, quantity ] = splitItem.split( ',' );
        const itemData = await itemInfoParser.getItemInformation( parseInt( itemId ) );
        finalItemsData.push( {
          itemId,
          quantity,
          itemData: JSON.parse( itemData ),
        } );
      }

      return finalItemsData;
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
}, {
  sequelize: AccountServer,
  tableName: 'StorageBox',
  timestamps: true,
} );
