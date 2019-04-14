'use strict'
import { isUnique } from '../../validators/validators';

export default ( sequelize, DataTypes ) => {
  const Account = sequelize.define( 'Account', {

    act_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true
    },
    act_name: {
      type: DataTypes.STRING,
      validate: {
        isUnique: ( value ) => isUnique( Account, 'act_name', value )
      },
    },
    gm: DataTypes.DECIMAL,
    cha_ids: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { tableName: 'account', timestamps: false } );

  return Account;
};
