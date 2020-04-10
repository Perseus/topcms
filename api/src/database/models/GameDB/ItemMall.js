module.exports = ( sequelize, DataTypes ) => {
  const ItemMall = sequelize.define( 'ItemMall', {
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
  } );

  ItemMall.associate = function( models ) {
    this.belongsTo( models.MallCategory, {
      targetKey: 'id',
      foreignKey: 'category_id',
      as: 'category'
    } );
  };

  return ItemMall;
};
