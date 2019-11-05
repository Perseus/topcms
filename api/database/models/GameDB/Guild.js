'use strict'
const { isUnique } = require( '../../validators/validators' );
const { JobTypes } = require( '../../../config' );

const guildModel = ( sequelize, DataTypes ) => {
  const Guild = sequelize.define( 'Guild', {

    guild_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
      autoIncrement: true,
    },
    guild_name: {
      type: DataTypes.STRING,
      get() {
        const guild_name = this.getDataValue('guild_name');
        if ( guild_name === 'Navy HQ' ) {
          return 'N/A';
        }

        return guild_name;
      },
    },
    motto: DataTypes.STRING,
    passwd: DataTypes.STRING,
    leader_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    member_total: DataTypes.INTEGER,

  }, {
    tableName: 'Guild',
    timestamps: false,
  } );

  Guild.associate = function( models ) {
    this.belongsTo( models.Character, {
      targetKey: 'cha_id',
      foreignKey: 'leader_id',
      as: 'leader'
    } );
  }

  return Guild;
};

module.exports = guildModel;
