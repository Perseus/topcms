import _ from 'lodash';
import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.FETCHING_SITE_INFO ] ( state ) {
    state.fetchingSiteInfo = true;
  },
  [ MutationTypes.FETCHED_SITE_AUTHORS ] ( state, { authors } ) {
    state.authors = authors;
  },
  [ MutationTypes.FETCHED_SITE_INFO ] ( state ) {
    state.fetchingSiteInfo = false;
  },
  [ MutationTypes.CREATING_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isCreating = true;
  },
  [ MutationTypes.CREATED_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isCreating = false;

    const hasError = _.get( payload, 'hasError', false );
    if ( hasError ) {
      state[ `${payload.type}ProcessingState` ].errors = payload.error;
      return;
    }


    if ( payload.type === 'author' ) {
      state.authors.push( payload.data );
    }
  },
  [ MutationTypes.UPDATING_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isUpdating = true;
  },
  [ MutationTypes.UPDATED_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isUpdating = false;

    const hasError = _.get( payload, 'hasError', false );
    if ( hasError ) {
      state[ `${payload.type}ProcessingState` ].errors = payload.error;
      return;
    }

    if ( payload.type === 'author' ) {
      const authorIndex = _.findIndex( state.authors, author => author.id === payload.id );
      state.authors[ authorIndex ].name = payload.name;
    }
  },
  [ MutationTypes.DELETING_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isDeleting = true;
  },
  [ MutationTypes.DELETED_SITE_INFO ] ( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isDeleting = false;

    if ( payload.type === 'author' ) {
      state.authors = state.authors.filter( author => author.id !== payload.id );
    }
  },
};

export default Mutations;