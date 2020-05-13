import _ from 'lodash';

import request from '../../../services/GraphQLRequest';

const Getters = {
  isFetchingSiteInfo( state ) {
    return state.fetchingSiteInfo;
  },
  isCreatingAuthor() {
    return request.isRequestInProgress( 'createAuthor' );
  },
  authorCreationError( state ) {
    return state.authorProcessingState.errors;
  },
  isUpdatingAuthor() {
    return request.isRequestInProgress( 'updateAuthor' );
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
  isCreatingDownload() {
    return request.isRequestInProgress( 'createDownload' );
  },
  isUpdatingDownload( state ) {
    return request.isRequestInProgress( 'editDownload' );
  },
  downloadManagementError( state ) {
    return state.downloadProcessingState.errors;
  },
  isCreatingNews() {
    return request.isRequestInProgress( 'createNewsArticle' );
  },

  isUpdatingNews() {
    return request.isRequestInProgress( 'editNewsArticle' );
  }
};

export default Getters;
