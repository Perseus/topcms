module.exports = {
  up: ( queryInterface, Sequelize ) => queryInterface.sequelize.transaction( t => Promise.all( [
    queryInterface.addColumn( 'account', 'mall_points', {
      type: Sequelize.DataTypes.INTEGER
    }, { transaction: t } ),
    queryInterface.addColumn( 'account', 'awardCenter_points', {
      type: Sequelize.DataTypes.INTEGER
    }, { transaction: t } )
  ] ) ),

  down: queryInterface => queryInterface.sequelize.transaction( t => Promise.all( [
    queryInterface.removeColumn( 'account', 'mall_points', { transaction: t } ),
    queryInterface.removeColumn( 'account', 'awardCenter_points', { transaction: t } )
  ] ) )
};
