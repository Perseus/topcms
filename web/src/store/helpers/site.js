import { SnackbarProgrammatic as Snackbar } from 'buefy';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleSiteItemCreationErrors = ( error, itemType ) => {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'author.FOUND':
      snackbarErrorMessage = 'An author with that name already exists';
      break;
    default:
  }

  Snackbar.open( {
    duration: 5000,
    message: snackbarErrorMessage,
    position: 'is-top-right',
    type: 'is-danger'
  } );
};
