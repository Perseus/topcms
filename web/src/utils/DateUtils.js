import { distanceInWordsToNow } from 'date-fns';

export function getDateInWordsToNow( date ) {
  return distanceInWordsToNow( date * 1 );
}
