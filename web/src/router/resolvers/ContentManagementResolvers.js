import _ from 'lodash';

export function editAuthorResolver( route, next ) {
  const authorId = _.get( route, 'params.id' );
  console.log( authorId );
}
