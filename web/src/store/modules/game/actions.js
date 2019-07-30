import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import { apolloProvider } from '../../../apollo';
import { getGameStatsQuery } from '../../../apollo/queries/admin/game';

const Actions = {
  async [ ActionTypes.getServerStats ] ( { commit } ) {
    commit( MutationTypes.RETRIEVING_GAME_STATS );

    try {
      const gameStatsResponse = await apolloProvider.defaultClient.query( {
        query: getGameStatsQuery
      } );
      commit( MutationTypes.RETRIEVED_GAME_STATS, { gameStats: gameStatsResponse.data.gameStats } );
    } catch ( err ) {
      if ( process.env.NODE_ENV === 'development' ) {
        console.log( err );
      }
    }
  }
};

export default Actions;
