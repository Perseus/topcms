'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Download = sequelize.define( 'Download', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {} );

  Download.associate = function( models ) {
    this.belongsTo( models.Author, {
      targetKey: 'id',
      foreignKey: 'author_id',
      as: 'author'
    } );
  }
  return Download;
};
