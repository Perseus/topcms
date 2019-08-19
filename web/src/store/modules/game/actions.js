import { Snackbar } from 'buefy/dist/components/snackbar';

import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import { apolloClient } from '../../../apollo';
import { getGameStatsQuery, getStaffOnlineStatusQuery, getServerRatesQuery } from '../../../apollo/queries/admin/game';
import { updateServerRatesMutation } from '../../../apollo/mutations/admin/game';
import Logger from '../../../services/Logger';

const Actions = {
  async [ ActionTypes.getServerStats ] ( { commit } ) {
    commit( MutationTypes.RETRIEVING_GAME_STATS );

    try {
      const gameStatsResponse = await apolloClient.query( {
        query: getGameStatsQuery
      } );
      commit( MutationTypes.RETRIEVED_GAME_STATS, { gameStats: gameStatsResponse.data.gameStats } );
    } catch ( err ) {
      Logger.log( `Error at getServerStats: ${err} ` );
    }
  },


  async [ ActionTypes.retrieveStaffOnlineStatus ] ( { commit, } ) {
    try {
      commit( MutationTypes.FETCHING_STAFF_ONLINE_STATUS );
      const staffStatusResponse = await apolloClient.query( {
        query: getStaffOnlineStatusQuery
      } );
      commit( MutationTypes.FETCHED_STAFF_ONLINE_STATUS, { staffData: staffStatusResponse.data.staffStatuses } );
    } catch ( err ) {
      Logger.log( `Error at retrieveStaffOnlineStatus: ${err}` );
    }
  },

  async [ ActionTypes.fetchServerRates ] ( { commit } ) {
    try {
      commit( MutationTypes.FETCHING_SERVER_RATES );
      const serverRatesResponse = await apolloClient.query( {
        query: getServerRatesQuery,
        fetchPolicy: 'network-only'
      } );
      commit( MutationTypes.FETCHED_SERVER_RATES, { rates: serverRatesResponse.data.serverRateInfo } );
    } catch ( err ) {
      Logger.log( `Error at fetchServerRates: ${err}` );
    }
  },

  async [ ActionTypes.updateServerRates ] ( { commit }, payload ) {
    try {
      const { rates } = payload;
      commit( MutationTypes.UPDATING_SERVER_RATES );
      const updatedServerRatesResponse = await apolloClient.mutate( {
        mutation: updateServerRatesMutation,
        variables: {
          rates,
        }
      } );

      commit( MutationTypes.FETCHED_SERVER_RATES, { rates: updatedServerRatesResponse.data.updateServerRates } );
      Snackbar.open( {
        duration: 2000,
        message: 'Server Rates updated successfully!',
        position: 'is-top',
        type: 'is-success',
      } );
    } catch ( err ) {
      Logger.log( `Error at updateServerRates: ${err}` );
      Snackbar.open( {
        duration: 5000,
        message: 'There was an error while trying to update server rates!',
        position: 'is-top',
        type: 'is-danger',
      } );
    }
  }
};

export default Actions;
