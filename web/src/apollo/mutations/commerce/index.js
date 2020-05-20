import gql from 'graphql-tag';

import { commonQueryFields } from '../../utils';

export const createMallCategoryMutation = gql`
  mutation createMallCategory($name: String!) {
    createCommerceCategory(name: $name) {
      ${commonQueryFields()}
      data {
        id
        name
        total_items   
      }
    }
  }
`;

export const editMallCategoryMutation = gql`
  mutation editMallCategory($id: ID!, $name: String!) {
    editCommerceCategory(id: $id, name: $name) {
      ${commonQueryFields()}
      data {
        id
        name
        total_items
      }
    }
  }
`;

export const deleteMallCategoryMutation = gql`
  mutation deleteMallCategory($id: ID!) {
    deleteCommerceCategory(id: $id) {
      ${commonQueryFields()}
      data {
        id
      }
    }
  }
`;


export const createMallItemMutation = gql`
  mutation createMallItem($itemId: Int!, $price: Float!, $availableQuantity: Int, $categoryId: Int!, $mallType: String!) {
    createCommerceItem(itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
      ${commonQueryFields()}
      data {
        id
        itemId
        price
        availableQuantity
        category {
          id
          name
        }
        mallType
      }
    }
  }
`;

export const editMallItemMutation = gql`
mutation editMallItem($id: Int!, $itemId: Int, $price: Float, $availableQuantity: Int, $categoryId: Int, $mallType: String) {
  editCommerceItem(id: $id, itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
    ${commonQueryFields()}
    data {
      id
      itemId
      price
      availableQuantity
      category {
        id
        name
      }
      mallType
    }
  }
}
`;

export const deleteMallItemMutation = gql`
  mutation deleteMallItem($id: Int!) {
    deleteCommerceItem(id: $id) {
      ${commonQueryFields()}
      data {
        id
      }
    }
  }
`;
