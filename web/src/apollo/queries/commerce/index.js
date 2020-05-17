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
