import gql from 'graphql-tag';

export const getCommerceCategories = gql`
  query getCommerceCategories {
    commerceCategories {
      id
      name
      total_items
    }
  }
`;
