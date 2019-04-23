'use strict';
module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define('Download', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  Download.associate = function(models) {
    // associations can be defined here
  };
  return Download;
};