const path = require( 'path' );
const _ = require( 'lodash' );

const logger = require( './FileLogger' );
const { DBInventoryAttributeMap: AttributeMap, DBInventoryGearMap: GearMap } = require( '../config' );
const ItemInfoParser = require( './ItemInfoParser' );

/* eslint-disable class-methods-use-this */

class InventoryParser {
  constructor( inventoryType, inventoryContent ) {
    this.inventoryType = inventoryType;
    this.inventoryContent = inventoryContent;
    this.encryptedInventory = '';
    this.cryptKey = '19800216';

    this.storeDecryptedInventory();
  }


  async storeDecryptedInventory() {
    let maxSize;
    let numberOfSomething;
    let encryptedInventory;

    if ( this.inventoryType === 0 ) {
      [ numberOfSomething, encryptedInventory ] = this.inventoryContent.split( /[@#]/, 3 );
      maxSize = 10;
    } else {
      [ maxSize, numberOfSomething, encryptedInventory ] = this.inventoryContent.split( /[@#]/, 3 );
    }

    if ( !encryptedInventory ) {
      encryptedInventory = '';
    }

    this.encryptedInventory = encryptedInventory;
    const decryptedInventory = this.decryptInventory( encryptedInventory.trim() );
    if ( this.inventoryType === 0 ) {
      return;
    }
    this.parsedInventory = this.retrieveItemsFromInventory( maxSize, numberOfSomething, decryptedInventory );
  }


  decryptInventory( encryptedInventory ) {
    if ( !encryptedInventory ) {
      return;
    }
    const cryptKeyLength = this.cryptKey.length;
    const inventoryLength = encryptedInventory.length;
    let decryptedInventory = '';

    // ToP used a weird way to encrypt their inventories
    for ( let i = 0; i < inventoryLength; i++ ) {
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
    for ( let i = 0; i < parsedInventory.maxSize; i++ ) {
      parsedInventory.items[ i ] = null;
    }

    // item[ 0 ] contains the slot at which the item exists
    // set that slot = the item
    for ( let i = 2; i < totalItemsInInventory - 1; i++ ) {
      const item = splitInventory[ i ].split( ',' );
      parsedInventory.items[ item[ 0 ] ] = item;
    }

    const computedCrc = this.computeCrc( parsedInventory );

    if ( computedCrc !== parsedInventory.crc ) {
      logger.log( { level: 'error', message: `CRC Mismatch while parsing inventory: computed CRC: ${computedCrc}, actual CRC: ${parsedInventory.crc}` } );
    }

    return parsedInventory;
  }

  async retrieveItemsFromGear() {
    let splitInventory = [];
    if ( this.encryptedInventory ) {
      splitInventory = ( this.encryptedInventory || [] ).split( ';' );
    }

    const playerGear = {};

    for ( const [ key, value ] of Object.entries( GearMap ) ) {
      playerGear[ key ] = await this.getGearInformation( splitInventory[ value ].split( ',' ) );
    }

    return playerGear;
  }

  computeCrc( inventory ) {
    const inventoryItems = inventory.items || [];
    let crc = Number( inventory.type );


    for ( let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++ ) {
      const item = inventoryItems[ itemIndex ] || [];
      const totalItemAttributes = item.length;
      for ( let i = 0; i < totalItemAttributes; i++ ) {
        if ( i !== 0 && i !== 10 ) {
          crc += Number( item[ i ] );
        }
      }
    }

    if ( isNaN( parseFloat( crc ) ) ) {
      return 0;
    }

    return crc;
  }

  async getParsedInventory() {
    if ( this.inventoryType === 0 ) {
      return this.parsedInventory;
    }

    const itemDetails = await this.fetchAllItemDetails();
    return itemDetails;
  }

  getBagSize() {
    return this.parsedInventory.maxSize || 0;
  }


  async fetchAllItemDetails() {
    const items = [];
    const inventoryItems = this.parsedInventory.items;

    for ( let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++ ) {
      const item = inventoryItems[ itemIndex ];
      if ( item ) {
        items.push( await this.getItemInformation( item ) );
      }
    }

    return items;
  }

  async getItemInformation( item ) {
    if ( !item || !Array.isArray( item ) ) {
      return;
    }

    const itemDetails = {
      slot: item[ AttributeMap.SLOT ],
      id: item[ AttributeMap.ID ],
      amount: item[ AttributeMap.AMOUNT ],
    };

    const itemInfoParser = new ItemInfoParser( null, path.join( 'data' ) );
    const itemId = itemDetails.id;
    const itemInformation = await itemInfoParser.getItemInformation( itemId );
    itemDetails.itemInfo = itemInformation;

    return itemDetails;
  }

  async getGearInformation( item ) {
    if ( !item || !Array.isArray( item ) ) {
      return;
    }

    const itemDetails = {
      id: item[ 0 ],
    };

    const itemInfoParser = new ItemInfoParser( null, path.join( 'data' ) );
    const itemInformation = await itemInfoParser.getItemInformation( itemDetails.id );
    itemDetails.itemInfo = itemInformation;

    return itemDetails;
  }


  getEquipmentGemInformation( item ) {
    const gemString = item[ 8 ];

    if ( !gemString ) {
      return;
    }


    console.log( gemString );
  }
}


module.exports =  InventoryParser;
