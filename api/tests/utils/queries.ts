import gql from 'graphql-tag';
import { getCommonRequestFields } from '../../src/graphql/utils/schema';

export const CREATE_COMMERCE_CATEGORY = gql`
mutation createMallCategory($name: String!) {
    createCommerceCategory(name: $name) {
      ${getCommonRequestFields()}
      data {
        id
        name
        total_items   
      }
    }
  }
`;

export const CREATE_COMMERCE_ITEM = gql`mutation createMallItem($itemId: Int!, $price: Float!, $availableQuantity: Int, $categoryId: Int!, $mallType: String!) {
    createCommerceItem(itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
      ${getCommonRequestFields()}
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

export const EDIT_COMMERCE_ITEM = gql`mutation editMallItem($id: Int!, $itemId: Int, $price: Float, $availableQuantity: Int, $categoryId: Int, $mallType: String) {
    editCommerceItem(id: $id, itemId: $itemId, price: $price, availableQuantity: $availableQuantity, categoryId: $categoryId, mallType: $mallType) {
      ${getCommonRequestFields()}
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

export const GET_COMMERCE_ITEM = gql`
  query getCommerceItem($id: Int!) {
    commerceItem(id: $id) {
      ${getCommonRequestFields()}
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

export const DELETE_COMMERCE_ITEM = gql`
  mutation deleteCommerceItem($id: Int!) {
    deleteCommerceItem(id: $id) {
      ${getCommonRequestFields()}
      data {
        id
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: SignUpInput!) {
    createUser(input: $input) {
        ${getCommonRequestFields()}
        data {
            id
            name
            email
            account_details {
                access_levels
            }
        }
    }
  }
`;

export const GET_USER = gql`
  query filteredUser($id: ID!) {
    filteredUser(id: $id) {
      ${getCommonRequestFields()}
      data {
        id
        name
        mallPoints
        awardCenterPoints
      }
    }
  }
`;


export const ADD_MALL_POINTS = gql`
  mutation addMallPoints($id: Int!, $type: String!, $numPoints: Int!) {
    addMallPoints(id: $id, type: $type, numPoints: $numPoints) {
      ${getCommonRequestFields()}
      data {
        name
        mallPoints
        awardCenterPoints
      }
    }
  }
`;

export const PURCHASE_MALL_ITEM = gql`
  mutation purchaseMallItem($id: Int!, $quantity: Int!) {
    purchaseCommerceItem(id: $id, quantity: $quantity) {
      ${getCommonRequestFields()}
      data {
        item {
          id
          availableQuantity
          mallType
        }
      }
    }
  }
`;
