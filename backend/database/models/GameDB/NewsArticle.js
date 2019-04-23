'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewsArticle = sequelize.define('NewsArticle', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  NewsArticle.associate = function(models) {
    // associations can be defined here
  };
  return NewsArticle;
};