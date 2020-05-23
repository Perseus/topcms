
module.exports = {
  up: ( queryInterface, Sequelize ) => queryInterface.createTable( 'Polls', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    options: {
      type: Sequelize.STRING
    },
    votes: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    author_id: {
      type: Sequelize.INTEGER,
      references: {
        field: 'id',
        model: {
          tableName: 'Authors',
        }
      }
    }
  } ),
  down: ( queryInterface, Sequelize ) => queryInterface.dropTable( 'Polls' )
};
