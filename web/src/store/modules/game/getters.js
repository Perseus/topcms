const Getters = {
  isRetrievingGameStats( state, getters, rootState ) {
    return ( rootState.application.currentRequestsInProgress.includes( 'getGameStats' ) );
  },

  isFetchingStaffInfo( _, __, rootState ) {
    // return ( rootState.application.currentRequestsInProgress.includes( ''))
  },
  gameStats( state ) {
    return state.gameStats;
  }
};

export default Getters;
