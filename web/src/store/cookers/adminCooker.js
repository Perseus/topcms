import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';

export function characterInventoryCooker( character ) {
  const characterDetails = cloneDeep( character );

  if ( characterDetails.inventories ) {
    characterDetails.inventories.forEach( ( inventory ) => {
      if ( inventory.content && inventory.content !== '[]' ) {
        inventory.content = JSON.parse( inventory.content );
        inventory.content.forEach( ( content ) => {
          content.itemInfo = JSON.parse( content.itemInfo );
        } );
      }
    } );
  }

  characterDetails.look = JSON.parse( characterDetails.look || '{}' );
  forEach( characterDetails.look, ( look ) => {
    look.itemInfo = JSON.parse( look.itemInfo );
  } );


  return characterDetails;
}
