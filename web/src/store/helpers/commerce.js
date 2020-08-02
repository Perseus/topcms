import ActionTypes from '@store/types/ActionTypes';

const defaultSnackbarMessage = 'Something went wrong. Please try again.';

export const handleItemPurchaseErrors = ( error, { dispatch } ) => {
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

  dispatch( ActionTypes.triggerToast, {
    content: snackbarErrorMessage,
    duration: 5000,
    type: 'error'
  } );
};
