'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const NewsArticle = sequelize.define( 'NewsArticle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {} );
  NewsArticle.associate = function( models ) {
    // associations can be defined here
    this.belongsTo( models.Author );
  };
  return NewsArticle;
};
