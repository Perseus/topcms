import actions from './actions';
import getters from './getters';
import mutations from './mutations';

function getInitialState() {
  return {
    isAppLoading: false,
    isAppLoaded: false,
    fetchingNewsFeed: false,
    fetchedNewsFeed: false,
    currentNewsFeedOffset: 0,
    newsFeed: [],
  };
}

const ApplicationModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default ApplicationModule;
