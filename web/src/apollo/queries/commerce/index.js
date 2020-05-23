import gql from 'graphql-tag';
import { commonQueryFields } from '../../utils';

export const getCommerceCategories = gql`
  query getCommerceCategories {
    commerceCategories {
      ${commonQueryFields()}
      data {
        id
        name
        total_items
      }
    }
  }
`;

export const getCommerceItems = gql`
  query getCommerceItems {
    commerceItems {
      ${commonQueryFields()}
      data {
        id
        itemId
        price
        numOfItems
        availableQuantity
        category {
          id
          name
        }
        mallType
        itemInfo
      }
    }
  }
`;
