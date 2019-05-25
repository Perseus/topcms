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
      AuthorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Authors",
          key: "id"
        },
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
      }
    } );
  },
  down: ( queryInterface, Sequelize ) => {
    return queryInterface.dropTable( 'NewsArticles' );
  }
};
