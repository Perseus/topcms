import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import RouteNames from '../../../config/RouteNames';

function getInitialState() {
  return {
    authors: [],
    authorProcessingState: {
      isCreating: false,
      isDeleting: false,
      isUpdating: false,
      errors: [],
    },
    news: [],
    newsProcessingState: {
      isCreating: false,
      isDeleting: false,
      isUpdating: false,
      errors: [],
    },
    downloads: [],
    downloadProcessingState: {
      isCreating: false,
      isDeleting: false,
      isUpdating: false,
      errors: [],
    },
    polls: [],
    pollProcessingState: {
      isCreating: false,
      isDeleting: false,
      isUpdating: false,
      errors: [],
    },
    fetchingSiteInfo: false,
  };
}

const SiteModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default SiteModule;
