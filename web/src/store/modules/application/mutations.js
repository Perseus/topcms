import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.APPLICATION_LOADING ]( state ) {
    state.isAppLoading = true;
  },
  [ MutationTypes.APPLICATION_LOADED ]( state ) {
    state.isAppLoading = false;
    state.isAppLoaded = true;
  },
  [ MutationTypes.FETCHING_NEWS_FEED ]( state ) {
    state.fetchingNewsFeed = true;
  },
  [ MutationTypes.FETCHED_NEWS_FEED ]( state, payload ) {
    state.fetchingNewsFeed = false;
    state.fetchedNewsFeed = true;
    state.currentNewsFeedOffset = payload.offset;
    state.newsFeed = payload.feed;
    if ( payload.totalArticles ) {
      state.totalArticles = payload.totalArticles;
    }
  },

  [ MutationTypes.UPDATE_REQUESTS_IN_PROGRESS ]( state, payload ) {
    if ( payload.type === 'START' ) {
      state.currentRequestsInProgress.push( payload.name );
    }

    if ( payload.type === 'COMPLETE' ) {
      state.currentRequestsInProgress = state.currentRequestsInProgress.filter( request => request !== payload.name );
    }
  },

  [ MutationTypes.TOGGLE_MODAL ]( state, payload ) {
    const { type, options } = payload;
    state.modalState.type = type || '';
    state.modalState.options = options || {};
  },

  [ MutationTypes.SET_ROUTE_RESOLVING_STATUS ]( state, payload ) {
    const { status } = payload;
    if ( status === 'RESOLVING' ) {
      state.isRouteResolving = true;
    } else {
      state.isRouteResolving = false;
    }
  }
};

export default Mutations;
