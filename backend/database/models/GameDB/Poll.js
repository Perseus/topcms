'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    options: DataTypes.STRING,
    votes: DataTypes.STRING
  }, {});
  Poll.associate = function(models) {
    // associations can be defined here
  };
  return Poll;
};