'use strict'

export default ( sequelize, DataTypes ) => {
  const Account = sequelize.define( 'Account', {

    act_id: {
      type: DataTypes.DECIMAL,
      primaryKey: true
    },
    act_name: DataTypes.STRING,
    gm: DataTypes.DECIMAL,
    cha_ids: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { tableName: 'account' } );

  return Account;
};
