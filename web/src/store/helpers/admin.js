import ActionTypes from '@store/types/ActionTypes';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleCharacterSearchErrors = ( error, { dispatch } ) => {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'character.NOT_FOUND':
      snackbarErrorMessage = 'The character you were looking for was not found';
      break;
    default:
  }

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    duration: 5000,
    type: 'error'
  } );
};
