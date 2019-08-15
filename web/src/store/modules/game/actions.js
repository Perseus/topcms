import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import { apolloClient } from '../../../apollo';
import { getGameStatsQuery, getStaffOnlineStatusQuery } from '../../../apollo/queries/admin/game';
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
      if ( process.env.NODE_ENV === 'development' ) {
        console.log( err );
      }
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
  }
};

export default Actions;
