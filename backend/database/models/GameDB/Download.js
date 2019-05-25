'use strict';
module.exports = ( sequelize, DataTypes ) => {
  const Download = sequelize.define( 'Download', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {} );
  Download.associate = function( models ) {
    // associations can be defined here
    this.belongsTo( models.Author );
  };
  return Download;
};
