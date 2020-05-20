const getters = {
  isAppBootstrapping( state ) {
    return state.isAppLoading || state.isRouteResolving;
  },
};

export default getters;
