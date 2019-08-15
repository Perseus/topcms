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
