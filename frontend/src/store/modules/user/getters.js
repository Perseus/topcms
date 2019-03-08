const getters = {
  userAuthStatus(state) {
    return (state.isLoggedIn === true);
  }
};


export default getters;