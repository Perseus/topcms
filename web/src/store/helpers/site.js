import ActionTypes from '@store/types/ActionTypes';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleSiteItemCreationErrors = ( error, itemType, { dispatch } ) => {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'author.FOUND':
      snackbarErrorMessage = 'An author with that name already exists';
      break;
    case 'input.VALIDATION_ERROR':
      snackbarErrorMessage = `There was an error while creating a ${itemType}: ${error.errors[ 0 ].message}`;
      break;
    default:
  }

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    type: 'error',
    duration: 5000
  } );
};
