import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { apolloClient } from '../../../apollo';
import { getNewsFeedQuery } from '../../../apollo/queries/admin/site';
import {} from '../../../apollo/queries/admin/game';
import Logger from '../../../services/Logger';
import { newsFeedCooker } from '../../cookers/applicationCooker';
import SocketHandler from '../../../socket';

const Actions = {
  async [ ActionTypes.bootstrapApplication ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.APPLICATION_LOADING );

    await dispatch( ActionTypes.retrieveUser );
    dispatch( ActionTypes.connectToSocketServer );
    dispatch( ActionTypes.setInitialRoute, payload.route );

    commit( MutationTypes.APPLICATION_LOADED );
  },

  async [ ActionTypes.connectToSocketServer ] ( { commit, state, rootState } ) {
    const { user } = rootState;
    if ( user.isLoggedIn && user.permissions.includes( 'ADMIN' ) ) {
      SocketHandler.init();
    }
  },

  async [ ActionTypes.retrieveLandingPageInformation ] ( { commit }, payload ) {
    const limit = payload ? payload.limit || 5 : 5;
    const offset = payload ? payload.offset || 0 : 0;

    try {
      commit( MutationTypes.FETCHING_NEWS_FEED );
      const newsFeedResponse = await apolloClient.query( {
        query: getNewsFeedQuery,
        variables: {
          limit,
          offset
        },
        fetchPolicy: 'network-only',
      } );
      const feed = newsFeedResponse.data.newsFeed.articles;
      commit( MutationTypes.FETCHED_NEWS_FEED, { feed, offset: newsFeedResponse.data.newsFeed.offset } );
    } catch ( err ) {
      Logger.log( `Error at retrieveLandingPageInformation: ${err}` );
    }
  },

  async [ ActionTypes.getSiteNewsFeed ] ( { commit }, payload ) {
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
      const feed = newsFeedResponse.data.newsFeed.articles;
      commit( MutationTypes.FETCHED_NEWS_FEED, { feed, offset: newsFeedResponse.data.newsFeed.offset, totalArticles: newsFeedResponse.data.newsFeed.total_articles } );
    } catch ( err ) {
      Logger.log( `Error at getSiteNewsFeed: ${err} ` );
    }
  },

  [ ActionTypes.updateRequestsInProgress ] ( { commit }, payload ) {
    commit( MutationTypes.UPDATE_REQUESTS_IN_PROGRESS, payload );
  },

  [ ActionTypes.toggleModal ] ( { commit }, payload = {} ) {
    const { type = '', options = {} } = payload;
    commit( MutationTypes.TOGGLE_MODAL, { type, options } );
  }
};

export default Actions;
