
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface ): Promise<void> => queryInterface.createTable( 'StorageBox', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account_login',
        key: 'id'
      },
      unique: true,
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, ),

  down: ( queryInterface: QueryInterface ): Promise<void> => queryInterface.dropTable( 'StorageBox' )
};
