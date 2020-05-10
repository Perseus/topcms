import request from '../../../services/GraphQLRequest';

const Getters = {
  isRetrievingGameStats() {
    return request.isRequestInProgress( 'getGameStats' );
  },

  isFetchingStaffInfo() {
    return request.isRequestInProgress( 'staffStatus' );
  }
};

export default Getters;
