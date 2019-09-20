'use strict'
import { isUnique } from '../../validators/validators';
import InventoryParser from '../../../utils/InventoryParser';

export default ( sequelize, DataTypes ) => {
  const Resource = sequelize.define( 'Resource', {

    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cha_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    content: { 
      type: DataTypes.TEXT,
      get() {
        const inventoryType = this.getDataValue( 'type_id' );
        const inventoryContent = this.getDataValue( 'content' );
        const inventory = new InventoryParser( inventoryType, inventoryContent );

        return inventory.getParsedInventory();
      },
    }
  }, {
    tableName: 'Resource',
    timestamps: false,
  } );


  Resource.associate = function( models ) {
    this.belongsTo( models.Character, {
      targetKey: 'cha_id',
      foreignKey: 'cha_id',
      as: 'character'
    } );
  }

  

  return Resource;
};
