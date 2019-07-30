import RouteNames from '../../config/RouteNames';
import store from '../../store/store';
import ActionTypes from '../../store/types/ActionTypes';

const RouteResolvers = {
  [ RouteNames.ROOT.__ROOT__ ]: async ( route ) => {
    await store.dispatch( ActionTypes.bootstrapApplication, { route } );
  },
  [ RouteNames.ROOT.__LANDING__ ]: async () => {

  },

};

export default RouteResolvers;
