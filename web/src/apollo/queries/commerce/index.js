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


export const getMallItems = gql`
  query getMallItems {
    allMallItems {
      id
      name
      itemId
      categoryId
      availableQuantity
      mallType
    }
  }
`;
