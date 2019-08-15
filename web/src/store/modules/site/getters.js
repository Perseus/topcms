import _ from 'lodash';

const Getters = {
  isFetchingSiteInfo( state ) {
    return state.fetchingSiteInfo;
  },
  isCreatingAuthor( state ) {
    return state.authorProcessingState.isCreating;
  },
  authorCreationError( state ) {
    return state.authorProcessingState.errors;
  },
  isUpdatingAuthor( state ) {
    return state.authorProcessingState.isUpdating;
  },
  authorEditingError( state ) {
    return state.authorProcessingState.errors;
  },
  authorDeletingError( state ) {
    const hasDeleteError = _.find( state.authorProcessingState.errors, { action: 'delete' } );
    if ( hasDeleteError ) {
      return hasDeleteError;
    }

    return null;
  },
  isCreatingDownload( state ) {
    return state.downloadProcessingState.isCreating;
  },
  isUpdatingDownload( state ) {
    return state.downloadProcessingState.isUpdating;
  },
  downloadManagementError( state ) {
    return state.downloadProcessingState.errors;
  },
  isCreatingNews( state ) {
    return state.newsProcessingState.isCreating;
  }
};

export default Getters;
