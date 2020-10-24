import ActionTypes from '@store/types/ActionTypes';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleRegistrationErrors = function( error, { dispatch } ) {
  let snackbarErrorMessage = defaultSnackbarMessage;
  switch ( error.code ) {
    case 'user.FOUND':
      snackbarErrorMessage = 'A user with that username or email already exists.';
      break;
    default:
      snackbarErrorMessage = 'Something went wrong. Please try again.';
  }

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    duration: 5000,
    type: 'error'
  } );
};

export const handleLoginErrors = function( error, { dispatch } ) {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'user.NOT_FOUND':
      snackbarErrorMessage = 'Invalid username or password';
      break;
    default:
  }

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    duration: 5000,
    type: 'error'
  } );
};


export const handleUpdateUserErrors = function( error, { dispatch } ) {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'user.PASSWORD_MISMATCH':
      snackbarErrorMessage = 'The old password is incorrect. Please enter the correct password';
      break;
    case 'input.VALIDATION_ERROR':
      snackbarErrorMessage = 'Please make sure all the fields have been filled properly. Your old password is required to change any of your account details';
      break;
    default:
  }

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    duration: 5000,
    type: 'error'
  } );
};
