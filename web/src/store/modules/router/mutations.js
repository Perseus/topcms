import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.SET_INITIAL_ROUTE ] ( state, { name, metaData } ) {
    state.currentRoute = name;
    state.metaData = metaData;
  },
  [ MutationTypes.CHANGE_ROUTE ] ( state, { name, metaData } ) {
    state.currentRoute = name;
    state.metaData = metaData;
  }
};

export default Mutations;
