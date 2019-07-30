const Getters = {
  isRetrievingGameStats( state ) {
    return state.retrievingGameStats;
  },
  gameStats( state ) {
    return state.gameStats;
  }
};

export default Getters;
