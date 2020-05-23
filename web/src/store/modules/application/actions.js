import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

import { getNewsFeedQuery } from '../../../apollo/queries/admin/site';
import {} from '../../../apollo/queries/admin/game';
import Logger from '../../../services/Logger';
import { newsFeedCooker } from '../../cookers/applicationCooker';
import SocketHandler from '../../../socket';
import request from '../../../services/GraphQLRequest';

const Actions = {
  async [ ActionTypes.bootstrapApplication ]( { commit, dispatch, state }, payload ) {
    try {
      commit( MutationTypes.APPLICATION_LOADING );

      await dispatch( ActionTypes.retrieveUser );
      await dispatch( ActionTypes.connectToSocketServer );
    } catch ( err ) {
      Logger.log( `Error at bootstrapApplication: ${err}` );
    } finally {
      commit( MutationTypes.APPLICATION_LOADED );

      await dispatch( ActionTypes.setInitialRoute, payload.route );
    }
  },

  async [ ActionTypes.connectToSocketServer ]( {
    rootState, getters
  } ) {
    const { user } = rootState;
    if ( user.isLoggedIn && getters.canAccessGameAdmin ) {
      SocketHandler.init();
    }
  },

  [ ActionTypes.retrieveLandingPageInformation ]( { commit, dispatch }, payload ) {
    dispatch( ActionTypes.getSiteNewsFeed );
  },

  async [ ActionTypes.getSiteNewsFeed ]( { commit }, payload ) {
    const limit = payload ? payload.limit || 5 : 5;
    const offset = payload ? payload.offset || 0 : 0;

    try {
      commit( MutationTypes.FETCHING_NEWS_FEED );
      const { newsFeed: newsFeedResponse } = await request.query( getNewsFeedQuery, {
        limit,
        offset
      }, { fetchPolicy: 'network-only' } );

      const feed = newsFeedResponse.data.articles;
      commit( MutationTypes.FETCHED_NEWS_FEED, { feed, offset: newsFeedResponse.data.offset } );
    } catch ( err ) {
      Logger.log( `Error at retrieveLandingPageInformation: ${err}` );
    }
  },

  [ ActionTypes.updateRequestsInProgress ]( { commit }, payload ) {
    commit( MutationTypes.UPDATE_REQUESTS_IN_PROGRESS, payload );
  },

  [ ActionTypes.toggleModal ]( { commit }, payload = {} ) {
    const { type = '', options = {} } = payload;
    commit( MutationTypes.TOGGLE_MODAL, { type, options } );
  }
};

export default Actions;
