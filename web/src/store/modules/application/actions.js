import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';


import { getNewsFeedQuery, getServerDetailStructureInformation } from '../../../apollo/queries/admin/site';
import Logger from '../../../services/Logger';
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
      await SocketHandler.init();
    }
  },

  async [ ActionTypes.retrieveLandingPageInformation ]( { commit, dispatch }, payload ) {
    try {
      const resp = await request.query( getServerDetailStructureInformation, null, {
        fetchPolicy: 'network-only'
      } );

      const {
        gameStats, newsFeed, serverRateInfo, staffStatuses
      } = resp;

      if ( gameStats.success ) {
        commit( MutationTypes.RETRIEVED_GAME_STATS, { gameStats: gameStats.data } );
      }

      if ( newsFeed.success ) {
        commit( MutationTypes.FETCHED_NEWS_FEED, { feed: newsFeed.data.articles, offset: newsFeed.data.offset } );
      }

      if ( serverRateInfo.success ) {
        commit( MutationTypes.FETCHED_SERVER_RATES, { rates: serverRateInfo.data } );
      }

      if ( staffStatuses.success ) {
        commit( MutationTypes.FETCHED_STAFF_ONLINE_STATUS, { staffData: staffStatuses.data } );
      }
    } catch ( err ) {
      Logger.log( `Error at retrieveLandingPageInformation: ${err} ` );
      dispatch( ActionTypes.triggerToast, {
        content: 'There was an error while trying to fetch some server information',
        position: 'is-bottom',
        duration: 3000,
        type: 'error'
      } );
    }
  },

  async [ ActionTypes.getSiteNewsFeed ]( { commit }, payload ) {
    const limit = payload ? payload.limit || 5 : 5;
    const offset = payload ? payload.offset || 0 : 0;

    try {
      const { newsFeed: newsFeedResponse } = await request.query( getNewsFeedQuery, {
        limit,
        offset
      }, { fetchPolicy: 'network-only' } );

      const feed = newsFeedResponse.data.articles;
      commit( MutationTypes.FETCHED_NEWS_FEED, { feed, offset: newsFeedResponse.data.offset } );
    } catch ( err ) {
      Logger.log( `Error at getSiteNewsFeed: ${err}` );
    }
  },

  [ ActionTypes.updateRequestsInProgress ]( { commit }, payload ) {
    commit( MutationTypes.UPDATE_REQUESTS_IN_PROGRESS, payload );
  },

  [ ActionTypes.toggleModal ]( { commit }, payload = {} ) {
    const { type = '', options = {} } = payload;
    commit( MutationTypes.TOGGLE_MODAL, { type, options } );
  },

  [ ActionTypes.triggerToast ]( { commit }, { content = '', type = 'success', timeout = 4000 } ) {
    const identifier = `Toast-${type}-${Date.now()}`;
    commit( MutationTypes.TRIGGER_NEW_TOAST, {
      action: 'add',
      content,
      identifier,
      type
    } );

    setTimeout( () => {
      commit( MutationTypes.TRIGGER_NEW_TOAST, {
        action: 'remove',
        identifier
      } );
    }, timeout );
  }
};

export default Actions;
