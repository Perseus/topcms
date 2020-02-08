import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export function getInitialState() {
  return {
    commerceCategories: [],
  };
}

const CommerceModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default CommerceModule;
