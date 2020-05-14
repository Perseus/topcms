import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.CHANGE_ROUTE_WITHOUT_PLUGIN ]( state, { name, metaData } ) {
    state.currentRoute = name;
    state.metaData = metaData;
  },
  [ MutationTypes.CHANGE_ROUTE ]( state, { name, metaData } ) {
    state.prevRoute = {
      route: state.currentRoute,
      metaData: state.metaData,
    };

    state.currentRoute = name;
    state.metaData = metaData;
  }
};

export default Mutations;
