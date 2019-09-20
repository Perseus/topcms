import { _ } from "core-js";
import logger from './FileLogger';
import { DBInventoryAttributeMap as AttributeMap } from '../config';

class InventoryParser {

  constructor( inventoryType, inventoryContent ) {
    this.inventoryType = inventoryType;
    this.inventoryContent = inventoryContent;
    this.cryptKey = '19800216';

    this.storeDecryptedInventory();
  }


  storeDecryptedInventory() {
    let [ maxSize, numberOfSomething, encryptedInventory ] = this.inventoryContent.split(/[@#]/, 3 );
    if ( !encryptedInventory ) {
      encryptedInventory = '';
    }
    const decryptedInventory = this.decryptInventory( encryptedInventory.trim() );
    this.parsedInventory = this.retrieveItemsFromInventory( maxSize, numberOfSomething, decryptedInventory );;
  }


  decryptInventory( encryptedInventory ) {
    if ( !encryptedInventory ) {
      return;
    }
    const cryptKeyLength = this.cryptKey.length;
    const inventoryLength = encryptedInventory.length;
    let decryptedInventory = '';

    // this some complex shit. ToP used a weird way to encrypt their inventories
    for( let i = 0; i < inventoryLength; i++ ) {
      const asciiDifference = encryptedInventory[ i ].charCodeAt( 0 ) - this.cryptKey[ i % cryptKeyLength ].charCodeAt( 0 );
      decryptedInventory += String.fromCharCode( asciiDifference );
    }

    return decryptedInventory;
  }

  retrieveItemsFromInventory( maxSize, numberOfSomething, inventory ) {
    const parsedInventory = {
      no: numberOfSomething,
      maxSize: Number( maxSize ),
      type: '',
      size: 0,
      crc: 0,
      items: [],
      inventoryType: this.inventoryType,
    };

    let splitInventory = [];
    if ( inventory ) {
      splitInventory = ( inventory || [] ).split( ';' );
    }

    const totalItemsInInventory = ( splitInventory ).length;
    parsedInventory.type = splitInventory[ 0 ];
    parsedInventory.size = splitInventory[ 1 ]; 
    parsedInventory.crc = Number( splitInventory[ totalItemsInInventory - 1 ] ) || 0;

    // set a 'null' flag for each slot in the player's inventory
    for( let i = 0; i < parsedInventory.maxSize; i++ ) {
      parsedInventory.items[ i ] = null;
    }

    // item[ 0 ] contains the slot at which the item exists
    // set that slot = the item
    for( let i = 2; i < totalItemsInInventory - 1; i++ ) {
      const item = splitInventory[ i ].split( ',' );
      parsedInventory.items[ item[ 0 ] ] = item;
    }

    const computedCrc = this.computeCrc( parsedInventory );
    
    if ( computedCrc !== parsedInventory.crc ) {
      logger.log( { level: 'error', message: `CRC Mismatch while parsing inventory: computed CRC: ${computedCrc}, actual CRC: ${parsedInventory.crc}` } );
    }

    return parsedInventory;
  }

  computeCrc( inventory ) {
    const inventoryItems = inventory.items || [];
    let crc = Number( inventory.type );


    for( let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++ ) {
      const item = inventoryItems[ itemIndex ] || [];
      const totalItemAttributes = item.length;
      for ( let i = 0; i < totalItemAttributes; i++ ) {
        if ( i !== 0 && i !== 10 ) {
          crc += Number( item[ i ] );
        }
      }
    }

    if( isNaN( parseFloat( crc ) ) ) {
      return 0;
    }

    return crc;
  }

  getParsedInventory() {
    const itemDetails = this.fetchAllItemDetails();
    return this.parsedInventory;
  }

  fetchAllItemDetails() {
    const items = [];
    const inventoryItems = this.parsedInventory.items;
    
    for( let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++ ) {
      const item = inventoryItems[ itemIndex ];
      if ( item ) {
        items.push( this.getItemInformation( item ) );
      }
    }

    return items;
  }

  getItemInformation( item ) {
    if ( !item || !Array.isArray( item ) ) {
      return;
    }
    const itemDetails = {
      slot: item[ AttributeMap.SLOT ],
      id: item[ AttributeMap.ID ],
      amount: item[ AttributeMap.AMOUNT ],
    };


    const itemId = itemDetails.id;

    console.log( itemDetails );


  }


  getEquipmentGemInformation( item ) {
    const gemString = item[ 8 ];

    if ( !gemString ) {
      return;
    }


    console.log( gemString );
  }


};


export default InventoryParser;