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
      type: Sequelize.INTEGER,
    },
    availableQuantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
      default: -1,
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
    mall_type: {
      allowNull: false,
      type: Sequelize.STRING,
    }
  } ),

  down: queryInterface => queryInterface.dropTable( 'ItemMall' )
};
