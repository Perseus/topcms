import gql from 'graphql-tag';

export const updateServerRatesMutation = gql`
  mutation updateServerRates($rates: ServerRateInfoInput!) {
    updateServerRates(rates: $rates) {
      solo
      party
      ship
      drop
      fairy
    }
  }
`;

export const toggleUserBan = gql`
  mutation toggleUserBan($id: Int!, $newBanStatus: Int!) {
    toggleUserBan(id: $id, newBanStatus: $newBanStatus) {
      id
      ban
    }
  }
`;


export const updateUserEmail = gql`
  mutation updateUserEmail($id: ID!, $email: String!) {
    updateUserEmail(id: $id, email: $email) {
      id
      email
    }
  }
`;

export const updateUserFromAdmin = gql`
  mutation updateUserFromAdmin($id: ID!, $email: String, $password: String, $gm: Int) {
    updateUserFromAdmin(id: $id, email: $email, password: $password, gm: $gm) {
      id
      email
      name
      account_details {
        gm
      }
    }
  }
`;
