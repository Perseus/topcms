import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export function getDateInWordsToNow( date ) {
  return distanceInWordsToNow( date * 1 );
}
