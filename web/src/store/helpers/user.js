import { SnackbarProgrammatic as Snackbar } from 'buefy';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleRegistrationErrors = function( error ) {
  let snackbarErrorMessage = defaultSnackbarMessage;
  switch ( error.code ) {
    case 'user.FOUND':
      snackbarErrorMessage = 'A user with that username or email already exists.';
      break;
    default:
      snackbarErrorMessage = 'Something went wrong. Please try again.';
  }

  Snackbar.open( {
    duration: 5000,
    message: snackbarErrorMessage,
    position: 'is-top',
    type: 'is-danger'
  } );
};

export const handleLoginErrors = function( error ) {
  let snackbarErrorMessage = defaultSnackbarMessage;
  switch ( error.code ) {
    case 'user.NOT_FOUND':
      snackbarErrorMessage = 'Invalid username or password';
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
