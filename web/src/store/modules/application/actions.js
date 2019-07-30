import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

const Actions = {
  async [ ActionTypes.bootstrapApplication ]( { commit, dispatch }, payload ) {
    commit( MutationTypes.APPLICATION_LOADING );
    await dispatch( ActionTypes.retrieveUser );
    dispatch( ActionTypes.setInitialRoute, payload.route );
    commit( MutationTypes.APPLICATION_LOADED );
  }
};

export default Actions;
