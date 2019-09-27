import gql from 'graphql-tag';

export const creatingItemCache = gql`
  subscription itemCached {
    itemCached {
      name
    }
  }
`;
