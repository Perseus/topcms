import gql from 'graphql-tag';

export const createMallCategoryMutation = gql`
  mutation createMallCategory($name: String!) {
    createCommerceCategory(name: $name) {
      id
      name
      total_items
    }
  }
`;

export const editMallCategoryMutation = gql`
  mutation editMallCategory($id: ID!, $name: String!) {
    editCommerceCategory(id: $id, name: $name) {
      id
      name
      total_items
    }
  }
`;

export const deleteMallCategoryMutation = gql`
  mutation deleteMallCategory($id: ID!) {
    deleteCommerceCategory(id: $id) {
      id
    }
  }
`;
