require( 'dotenv' ).config();

module.exports = {
  AccountServer: {
    database: process.env.ACCOUNT_SERVER_DB,
    username: process.env.ACCOUNT_SERVER_USER,
    password: process.env.ACCOUNT_SERVER_PASSWORD,
    host: process.env.ACCOUNT_SERVER_HOST,
    dialect: 'mssql',
  },
  GameDB: {
    database: process.env.GAME_DB,
    username: process.env.GAME_DB_USER,
    password: process.env.GAME_DB_PASSWORD,
    host: process.env.GAME_DB_HOST,
    dialect: 'mssql',
  },
};
