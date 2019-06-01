'use strict'
import { isUnique } from '../../validators/validators';

export default ( sequelize, DataTypes ) => {
  const StatLog = sequelize.define( 'StatLog', {

    track_date: {
      type: DataTypes.STRING,
    },
    login_num: {
      type: DataTypes.INTEGER,
    },
    play_num: DataTypes.INTEGER,
  }, {
    tableName: 'stat_log',
    timestamps: false,
  } );

  return StatLog;
};
