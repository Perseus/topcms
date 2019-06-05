import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';

const Actions = {
  async [ ActionTypes.bootstrapApplication ]( { commit, dispatch } ) {
    commit( MutationTypes.APPLICATION_LOADING );
    await dispatch( ActionTypes.retrieveUser );
    setTimeout( () => {
      commit( MutationTypes.APPLICATION_LOADED );
    } );
  }
};

export default Actions;
