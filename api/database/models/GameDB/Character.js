'use strict'
import { isUnique } from '../../validators/validators';
import { JobTypes } from '../../../config';

export default ( sequelize, DataTypes ) => {
  const Character = sequelize.define( 'Character', {

    cha_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
      autoIncrement: true,
    },
    cha_name: {
      type: DataTypes.STRING,
    },
    act_id: DataTypes.DECIMAL,
    guild_id: DataTypes.DECIMAL,
    job: {
      type: DataTypes.STRING,
      get() {
        const retrievedJob = this.getDataValue('job');
        if ( JobTypes[ retrievedJob ] ) {
          return JobTypes[ retrievedJob ];
        }

        return retrievedJob;
      }
    },
    degree: DataTypes.DECIMAL,
    exp: DataTypes.DECIMAL,
    hp: DataTypes.DECIMAL,
    sp: DataTypes.DECIMAL,
    gd: DataTypes.DECIMAL,
    map: DataTypes.STRING,
    map_x: DataTypes.STRING,
    map_y: DataTypes.STRING,
    look: DataTypes.STRING,
    kb_capacity: DataTypes.DECIMAL,
    kitbag: DataTypes.DECIMAL,
    skillbag: DataTypes.STRING,
    birth: DataTypes.STRING,
    credit: DataTypes.DECIMAL,
    bank: DataTypes.DECIMAL,
    estop: DataTypes.STRING,

  }, {
    tableName: 'character',
    timestamps: false,
  } );

  Character.associate = function( models ) {
    this.belongsTo( models.Account, {
      targetKey: 'act_id',
      foreignKey: 'act_id',
      as: 'account'
    } );

    this.hasOne( models.Guild, {
      sourceKey: 'guild_id',
      foreignKey: 'guild_id',
      as: 'guild'
    } );
  }

  return Character;
};
