import { gql } from 'apollo-server-express';
import { getCommonResponseFields } from '../utils/schema';

export const typeDefs = gql`
  extend type Query {
    commerceCategories: CommerceCategoriesResponse
    commerceItem(id: Int!): CommerceItemResponse
    commerceItems: CommerceItemsResponse
  }

  extend type Mutation {
    createCommerceCategory(name: String!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)
    editCommerceCategory(id: ID!, name: String!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)
    deleteCommerceCategory(id: ID!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)

    createCommerceItem(itemId: Int!, price: Float!, availableQuantity: Int, numOfItems: Int, categoryId: Int!, mallType: String!): CommerceItemResponse @isAuthenticated(role: ADMIN)
    editCommerceItem(id: Int!, itemId: Int, price: Float, availableQuantity: Int, numOfItems: Int, categoryId: Int, mallType: String): CommerceItemResponse @isAuthenticated(role: ADMIN)
    deleteCommerceItem(id: Int!): CommerceItemResponse @isAuthenticated(role: ADMIN)
  }

  type CommerceCategory {
    id: Int
    name: String
    total_items: Int
  }

  type CommerceItem {
    id: Int
    itemId: Int
    price: Float
    numOfItems: Int
    availableQuantity: Int
    category: CommerceCategory
    mallType: String
  }

  type CommerceItemsResponse {
    ${getCommonResponseFields()}
    data: [CommerceItem]
  }

  type CommerceItemResponse {
    ${getCommonResponseFields()}
    data: CommerceItem
  }

  type CommerceCategoriesResponse {
    ${getCommonResponseFields()}
    data: [CommerceCategory]
  }

  type CommerceCategoryResponse {
    ${getCommonResponseFields()}
    data: CommerceCategory
  }
`;
