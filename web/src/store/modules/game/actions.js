import { SnackbarProgrammatic as Snackbar } from 'buefy';

import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import {
  getGameStatsQuery, getStaffOnlineStatusQuery, getServerRatesQuery, getPlayerRanking, getGuildRanking
} from '../../../apollo/queries/admin/game';
import { updateServerRatesMutation } from '../../../apollo/mutations/admin/game';

import request from '../../../services/GraphQLRequest';
import Logger from '../../../services/Logger';

const Actions = {
  async [ ActionTypes.getServerStats ]( { commit } ) {
    try {
      const gameStatsResponse = await request.query( getGameStatsQuery );
      const { gameStats: response } = gameStatsResponse;

      if ( response.success !== true ) {
        throw new Error( response );
      }

      commit( MutationTypes.RETRIEVED_GAME_STATS, { gameStats: response.data } );
    } catch ( err ) {
      Logger.log( `Error at getServerStats: ${err} ` );
    }
  },


  async [ ActionTypes.retrieveStaffOnlineStatus ]( { commit, } ) {
    try {
      const staffStatusResponse = await request.query( getStaffOnlineStatusQuery );
      commit( MutationTypes.FETCHED_STAFF_ONLINE_STATUS, { staffData: staffStatusResponse.data.staffStatuses } );
    } catch ( err ) {
      Logger.log( `Error at retrieveStaffOnlineStatus: ${err}` );
    }
  },

  async [ ActionTypes.fetchServerRates ]( { commit } ) {
    try {
      const response = await request.query( getServerRatesQuery, null, {
        fetchPolicy: 'network-only'
      } );

      const { serverRateInfo: rateResponse } = response;

      const { data } = rateResponse;

      console.log( data );
      commit( MutationTypes.FETCHED_SERVER_RATES, { rates: data } );
    } catch ( err ) {
      Logger.log( `Error at fetchServerRates: ${err}` );
    }
  },

  async [ ActionTypes.updateServerRates ]( { commit }, payload ) {
    try {
      const { rates } = payload;
      const updatedServerRatesResponse = await request.mutation( updateServerRatesMutation, {
        rates
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
  },

  async [ ActionTypes.retrievePlayerRanking ]( { commit }, { filter } ) {
    try {
      const response = await request.query( getPlayerRanking, {
        filter
      } );
      commit( MutationTypes.RETRIEVED_PLAYER_RANKING, { playerRanking: response.data.playerRankings } );
    } catch ( err ) {
      Logger.log( `Error at action retrievePlayerRanking: ${err} ` );
      Snackbar.open( {
        duration: 5000,
        message: 'There was an error while trying to fetch player ranking',
        position: 'is-bottom',
        type: 'is-danger',
      } );
    }
  },

  async [ ActionTypes.retrieveGuildRanking ]( { commit } ) {
    try {
      const response = await request.query( getGuildRanking, {
        filter: 'FILTER'
      } );
      commit( MutationTypes.RETRIEVED_GUILD_RANKING, { guildRanking: response.data.guildRankings } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveGuildRanking: ${err} ` );
    }
  }
};

export default Actions;
