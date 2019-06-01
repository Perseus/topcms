import gql from 'graphql-tag';

const loginUserMutation = gql `
  mutation loginUser($name: String!, $password: String!){
    loginUser(name: $name, password: $password) {
      name
      email
      account_details {
        access_levels
      }
    }
  }
`;

const registerUserMutation = gql `
  mutation createUser($name: String!, $password: String!, $email: String!){
    createUser(name: $name, password: $password, email: $email) {
      name
      email
      account_details{
        access_levels
      }
    }
  }
`;

export {
  loginUserMutation,
  registerUserMutation
};
