import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.APPLICATION_LOADING ]( state ) {
    state.isAppLoading = true;
  },
  [ MutationTypes.APPLICATION_LOADED ]( state ) {
    state.isAppLoading = false;
    state.isAppLoaded = true;
  },
  [ MutationTypes.FETCHING_NEWS_FEED ] ( state ) {
    state.fetchingNewsFeed = true;
  },
  [ MutationTypes.FETCHED_NEWS_FEED ] ( state, payload ) {
    state.fetchingNewsFeed = false;
    state.fetchedNewsFeed = true;
    state.currentNewsFeedOffset = payload.offset;
    state.newsFeed = payload.feed;
  }
};

export default Mutations;
