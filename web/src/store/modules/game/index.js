import actions from './actions';
import getters from './getters';
import mutations from './mutations';

function getInitialState() {
  return {
    retrievingGameStats: false,
    gameStats: {},
  };
}

const GameModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default GameModule;
