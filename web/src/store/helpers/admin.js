import { SnackbarProgrammatic as Snackbar } from 'buefy';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleCharacterSearchErrors = ( error ) => {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'character.NOT_FOUND':
      snackbarErrorMessage = 'The character you were looking for was not found';
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
