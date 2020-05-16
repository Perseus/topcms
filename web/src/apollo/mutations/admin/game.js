import gql from 'graphql-tag';
import { commonQueryFields } from '../../utils';

export const updateServerRatesMutation = gql`
  mutation updateServerRates($rates: ServerRateInfoInput!) {
    updateServerRates(rates: $rates) {
      ${commonQueryFields()}
      data {
        solo
        party
        ship
        drop
        fairy
      }
    }
  }
`;

export const toggleUserBan = gql`
  mutation toggleUserBan($id: Int!, $newBanStatus: Int!) {
    toggleUserBan(id: $id, newBanStatus: $newBanStatus) {
      ${commonQueryFields()}
      data {
        id
        ban
      }
    }
  }
`;


export const updateUserEmail = gql`
  mutation updateUserEmail($id: ID!, $email: String!) {
    updateUserEmail(id: $id, email: $email) {
      ${commonQueryFields()}
      data {
        id
        email
      }
    }
  }
`;

export const updateUserFromAdmin = gql`
  mutation updateUserFromAdmin($id: ID!, $email: String, $password: String, $gm: Int) {
    updateUserFromAdmin(id: $id, email: $email, password: $password, gm: $gm) {
      ${commonQueryFields()}
      data {
        id
        email
        name
        account_details {
          gm
        }
      }
    }
  }
`;

export const resetUserSecurityCode = gql`
  mutation resetUserSecurityCode($id: ID!) {
    resetUserSecurityCode(id: $id) {
      ${commonQueryFields()}
      data {
        id
      }
    }
  }
`;
