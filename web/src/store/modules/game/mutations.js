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
  },

  [ MutationTypes.FETCHING_SERVER_RATES ] ( state ) {
    state.isFetchingServerRates = true;
    state.areServerRatesFetched = false;
  },

  [ MutationTypes.FETCHED_SERVER_RATES ] ( state, payload ) {
    const { rates } = payload;

    state.isFetchingServerRates = false;
    state.areServerRatesFetched = true;
    state.serverRates = rates;
  },

  [ MutationTypes.UPDATING_SERVER_RATES ] ( state ) {
    state.isUpdatingServerRates = true;
  },

  [ MutationTypes.RETRIEVING_PLAYER_RANKING ] ( state ) {
    state.isRetrievingPlayerRanking = true;
  },

  [ MutationTypes.RETRIEVED_PLAYER_RANKING ] ( state, payload ) {
    state.isRetrievingPlayerRanking = false;
    state.playerRanking = payload.playerRanking;
  },

  [ MutationTypes.RETRIEVING_GUILD_RANKING ] ( state ) {
    state.isRetrievingGuildRanking = true;
  },

  [ MutationTypes.RETRIEVED_GUILD_RANKING ] ( state, payload ) {
    state.isRetrievingGuildRanking = false;
    state.guildRanking = payload.guildRanking;
  }
};

export default Mutations;
