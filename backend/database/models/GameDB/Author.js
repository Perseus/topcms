'use strict';
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
  }, {} );
  Author.associate = function( models ) {
    // associations can be defined here
    this.hasMany( models.NewsArticle );
    this.hasMany( models.Poll );
    this.hasMany( models.Download );
  };
  // Author.hasMany( )
  return Author;
};
