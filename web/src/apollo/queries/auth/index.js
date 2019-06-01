import gql from 'graphql-tag';

const getCurrentUserQuery = gql `
  query getCurrentUser{
    me{
      name
      email
      account_details{
        access_levels
      }
    }
  }
`;

const logoutUserQuery = gql `
  query logout{
    logout
  }
`;
export {
  getCurrentUserQuery,
  logoutUserQuery
};
