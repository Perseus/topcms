import { QueryInterface, } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize ) => queryInterface.createTable( 'ItemMall', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    itemId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    price: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    availableQuantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: -1,
    },
    numOfItems: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'MallCategories',
        key: 'id'
      }
    },
    mallType: {
      allowNull: false,
      type: Sequelize.ENUM( 'MALL', 'CREDIT' ),
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  } ),

  down: queryInterface => queryInterface.dropTable( 'ItemMall' )
};
