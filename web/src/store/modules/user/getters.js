const getters = {
  userAuthStatus( state ) {
    return (state.isLoggedIn === true);
  },
  permissions( state ) {
    return ( state.permissions );
  },
};


export default getters;