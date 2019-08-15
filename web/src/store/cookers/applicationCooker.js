import _ from 'lodash';

export function newsFeedCooker( state, fetchedNewsFeedItems ) {
  const newsFeed = [ ...state.newsFeed ];

  _.forEach( fetchedNewsFeedItems, ( newsFeedItem ) => {
    let item = _.find( newsFeed, { id: newsFeedItem.id } );
    if ( item ) {
      item = newsFeedItem;
    } else {
      newsFeed.push( newsFeedItem );
    }
  } );

  return newsFeed;
}
