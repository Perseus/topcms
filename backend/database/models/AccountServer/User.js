'use strict'

export default ( sequelize, DataTypes ) => {
  const User = sequelize.define( 'User', {
    id: {
      type: DataTypes.DECIMAL,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    login_status: DataTypes.DECIMAL,
    last_login_time: DataTypes.DATE,
    last_login_ip: DataTypes.STRING,
    last_login_mac: DataTypes.STRING,
    ban: DataTypes.DECIMAL
  }, { tableName: 'account_login', timestamps: false } );

  return User;
};
