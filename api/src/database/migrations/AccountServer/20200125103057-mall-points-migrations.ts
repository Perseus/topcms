import { QueryInterface } from 'sequelize';

module.exports = {
  up: ( queryInterface: QueryInterface, Sequelize ): => queryInterface.sequelize.transaction( t => Promise.all( [
    queryInterface.addColumn( 'account_login', 'mallPoints', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }, { transaction: t } ),
    queryInterface.addColumn( 'account_login', 'awardCenterPoints', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }, { transaction: t } )
  ] ) ),

  down: ( queryInterface: QueryInterface ) => queryInterface.sequelize.transaction( t => Promise.all( [
    queryInterface.removeColumn( 'account_login', 'mallPoints', { transaction: t } ),
    queryInterface.removeColumn( 'account_login', 'awardCenterPoints', { transaction: t } )
  ] ) )
};
