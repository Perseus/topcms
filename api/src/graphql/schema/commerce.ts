import { gql } from 'apollo-server-express';
import { getCommonResponseFields } from '../utils/schema';

export const typeDefs = gql`
  extend type Query {
    commerceCategories: CommerceCategoriesResponse
  }

  extend type Mutation {
    createCommerceCategory(name: String!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)
    editCommerceCategory(id: ID!, name: String!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)
    deleteCommerceCategory(id: ID!): CommerceCategoryResponse @isAuthenticated(role: ADMIN)
  }

  type CommerceCategory {
    id: Int
    name: String
    total_items: Int
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
