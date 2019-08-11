'use strict';
module.exports = {
  up: ( queryInterface, Sequelize ) => {
    return queryInterface.createTable( 'NewsArticles', {
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
    } );
  },
  down: ( queryInterface, Sequelize ) => {
    return queryInterface.dropTable( 'NewsArticles' );
  }
};
