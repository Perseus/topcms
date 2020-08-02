import forEach from 'lodash/forEach';
import find from 'lodash/find';

export function newsFeedCooker( state, fetchedNewsFeedItems ) {
  const newsFeed = [ ...state.newsFeed ];

  forEach( fetchedNewsFeedItems, ( newsFeedItem ) => {
    let item = find( newsFeed, { id: newsFeedItem.id } );
    if ( item ) {
      item = newsFeedItem;
    } else {
      newsFeed.push( newsFeedItem );
    }
  } );

  return newsFeed;
}
