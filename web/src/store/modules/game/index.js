import actions from './actions';
import getters from './getters';
import mutations from './mutations';

function getInitialState() {
  return {
    retrievingGameStats: false,
    gameStats: {},
    GMInfo: [],
    isFetchingStaffInfo: false,
    isStaffInfoFetched: false,
  };
}

const GameModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default GameModule;
