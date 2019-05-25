import gql from 'graphql-tag';

const getAuthorsQuery = gql `
  query getAuthors{
    authors {
      id
      name
      createdAt
    }
  }
`;


export {
  getAuthorsQuery
};
