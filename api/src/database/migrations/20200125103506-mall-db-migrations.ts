module.exports = {
  up: ( queryInterface, Sequelize ) => queryInterface.createTable( 'ItemMall', {
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
        field: 'id',
        model: {
          tableName: 'MallCategories',
        }
      }
    },
    mallType: {
      allowNull: false,
      type: Sequelize.ENUM( 'MALL', 'CREDIT' ),
    }
  } ),

  down: queryInterface => queryInterface.dropTable( 'ItemMall' )
};
