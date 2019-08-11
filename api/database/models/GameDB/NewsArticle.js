'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const NewsArticle = sequelize.define( 'NewsArticle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {} );

  NewsArticle.associate = function( models ) {
    this.belongsTo( models.Author, {
      targetKey: 'id',
      foreignKey: 'author_id',
      as: 'author'
    } );
  }
  return NewsArticle;
};
