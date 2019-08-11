'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Poll = sequelize.define( 'Poll', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    options: DataTypes.STRING,
    votes: DataTypes.STRING,
  }, {} );

  Poll.associate = function( models ) {
    this.belongsTo( models.Author, {
      targetKey: 'id',
      foreignKey: 'author_id',
      as: 'author'
    } );
  }
  return Poll;
};
