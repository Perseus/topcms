import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { apolloClient } from '../../../apollo';
import { getNewsFeedQuery } from '../../../apollo/queries/admin/site';
import {} from '../../../apollo/queries/admin/game';
import Logger from '../../../services/Logger';
import { newsFeedCooker } from '../../cookers/applicationCooker';

const Actions = {
  async [ ActionTypes.bootstrapApplication ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.APPLICATION_LOADING );

    await dispatch( ActionTypes.retrieveUser );
    dispatch( ActionTypes.setInitialRoute, payload.route );

    commit( MutationTypes.APPLICATION_LOADED );
  },

  async [ ActionTypes.retrieveLandingPageInformation ] ( { commit, state }, payload ) {
    const limit = payload ? payload.limit || 10 : 10;
    const offset = payload ? payload.offset || 0 : 0;

    try {
      commit( MutationTypes.FETCHING_NEWS_FEED );
      const newsFeedResponse = await apolloClient.query( {
        query: getNewsFeedQuery,
        variables: {
          limit,
          offset
        }
      } );
      const feed = newsFeedCooker( state, newsFeedResponse.data.newsFeed.articles );
      commit( MutationTypes.FETCHED_NEWS_FEED, { feed, offset: newsFeedResponse.data.newsFeed.offset } );
    } catch ( err ) {
      Logger.log( `Error at retrieveLandingPageInformation: ${err}` );
    }
  }
};

export default Actions;
