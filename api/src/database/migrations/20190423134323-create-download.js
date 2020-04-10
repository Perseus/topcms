'use strict';
module.exports = {
  up: ( queryInterface, Sequelize ) => {
    return queryInterface.createTable( 'Downloads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      section: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable( 'Downloads' );
  }
};
