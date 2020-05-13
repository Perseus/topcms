
module.exports = {
  up: ( queryInterface, Sequelize ) => queryInterface.createTable( 'NewsArticles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
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
  down: ( queryInterface, Sequelize ) => queryInterface.dropTable( 'NewsArticles' )
};
