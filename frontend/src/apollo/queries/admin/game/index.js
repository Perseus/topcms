import gql from 'graphql-tag';

const getGameStatsQuery = gql `
  query getGameStats{
    gameStats{
      accounts
      characters
      online
      online_record
    }
  }
`;


export {
  getGameStatsQuery
};
