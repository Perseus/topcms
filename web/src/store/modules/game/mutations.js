import _ from 'lodash';
import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.RETRIEVING_GAME_STATS ]( state ) {
    state.retrievingGameStats = true;
  },

  [ MutationTypes.RETRIEVED_GAME_STATS ]( state, payload ) {
    state.gameStats = _.get( payload, 'gameStats' );
    state.retrievingGameStats = false;
  },

  [ MutationTypes.FETCHING_STAFF_ONLINE_STATUS ] ( state ) {
    state.isFetchingStaffInfo = true;
    state.isFetchedStaffInfo = false;
  },
  [ MutationTypes.FETCHED_STAFF_ONLINE_STATUS ] ( state, payload ) {
    state.isFetchingStaffInfo = false;
    state.isFetchedStaffInfo = true;
    state.GMInfo = payload.staffData;
  }
};

export default Mutations;
