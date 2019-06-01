import * as ActionTypes from '../../action-types';
import * as MutationTypes from '../../mutation-types';
import Router from '../../../router/index';

const Actions = {

  async [ ActionTypes.loadApplication ]( { dispatch, commit } ) {
    commit( MutationTypes.APPLICATION_LOADING );
    await dispatch( `user/${ActionTypes.retrieveUserFromSession}`, null, { root: true } );
    commit( MutationTypes.APPLICATION_LOADED );
  }

};

export default Actions;
