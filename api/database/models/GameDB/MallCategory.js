

module.exports = ( sequelize, DataTypes ) => {
  const MallCategory = sequelize.define( 'MallCategory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'MallCategories',
    timestamps: false,
  } );

  MallCategory.associate = function( models ) {
    this.hasMany( models.ItemMall, {
      foreignKey: 'category_id',
      as: 'mallItems',
    } );
  };
  return MallCategory;
};
