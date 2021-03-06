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
    isFetchingServerRates: false,
    areServerRatesFetched: true,
    isUpdatingServerRates: false,
    serverRates: {},
    isRetrievingPlayerRanking: false,
    isRetrievingGuildRanking: false,
    playerRanking: [],
    guildRanking: [],
  };
}

const GameModule = {
  state: getInitialState(),
  actions,
  getters,
  mutations,
};

export default GameModule;
