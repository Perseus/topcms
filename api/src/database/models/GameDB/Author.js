

module.exports = ( sequelize, DataTypes ) => {
  const Author = sequelize.define( 'Author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    underscored: true,
  } );
  Author.associate = function( models ) {
    // associations can be defined here
    this.hasMany( models.NewsArticle, {
      foreignKey: 'author_id',
    } );
    this.hasMany( models.Poll, {
      foreignKey: 'author_id',
    } );
    this.hasMany( models.Download, {
      foreignKey: 'author_id',
    } );
  };
  // Author.hasMany( )
  return Author;
};
