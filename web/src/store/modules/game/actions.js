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


  async [ ActionTypes.fetchServerRates ]( { commit } ) {
    try {
      const response = await request.query( getServerRatesQuery, null, {
        fetchPolicy: 'network-only'
      } );
      const { serverRateInfo: rateResponse } = response;
      const { data } = rateResponse;

      commit( MutationTypes.FETCHED_SERVER_RATES, { rates: data } );
    } catch ( err ) {
      Logger.log( `Error at fetchServerRates: ${err}` );
    }
  },

  async [ ActionTypes.updateServerRates ]( { commit }, payload ) {
    try {
      const { rates } = payload;
      const parsedRates = _.mapValues( rates, parseInt );

      const { updateServerRates: updatedServerRatesResponse } = await request.mutation( updateServerRatesMutation, {
        rates: parsedRates
      } );

      commit( MutationTypes.FETCHED_SERVER_RATES, { rates: updatedServerRatesResponse.data } );

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
      const { playerRankings: playerRankingsResponse } = await request.query( getPlayerRanking, {
        filter
      } );

      commit( MutationTypes.RETRIEVED_PLAYER_RANKING, { playerRanking: playerRankingsResponse.data } );
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
      const { guildRankings: guildRankingsResponse } = await request.query( getGuildRanking, {
        filter: 'FILTER'
      } );
      commit( MutationTypes.RETRIEVED_GUILD_RANKING, { guildRanking: guildRankingsResponse.data } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveGuildRanking: ${err} ` );
    }
  }
};

export default Actions;
