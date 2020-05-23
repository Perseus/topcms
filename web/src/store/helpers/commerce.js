import { SnackbarProgrammatic as Snackbar } from 'buefy';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleItemPurchaseErrors = ( error ) => {
  let snackbarErrorMessage = defaultSnackbarMessage;

  switch ( error.code ) {
    case 'input.INVALID_QUANTITY':
      snackbarErrorMessage = 'Please enter a quantity greater than 0';
      break;
    case 'itemmall.INSUFFICIENT_QUANTITY':
      snackbarErrorMessage = 'There are not enough units of this item remaining to complete your purchase';
      break;
    case 'user.NOT_ENOUGH_POINTS':
      snackbarErrorMessage = 'You do not have enough points to purchase this item';
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
