import path from 'path';
import _ from 'lodash';

import logger from './FileLogger';
import { DBInventoryAttributeMap as AttributeMap, DBInventoryGearMap as GearMap, ItemInfoAttributeMap as ItemInfoAttributes } from '../config';
import ItemInfoParser from './ItemInfoParser';

/* eslint-disable class-methods-use-this */

const dataDir = path.join( __dirname, '..', 'data' );

export enum InventoryType {
  LOOK,
  MAIN_BAG,
  BANK,
  TEMP_BAG,
}
interface ParsedInventoryItem {
  no: number;
  maxSize: number;
  type: string;
  crc: number;
  size: number;
  items: Record<number, number[]>;
  inventoryType: InventoryType;
}

interface SingleGearItem {
  id: number;
  itemInfo: string;
  dbAttributes: string[];
}

interface SingleBagItem {
  slot: number;
  id: number;
  amount: number;
  itemInfo: string;
  dbAttributes: number[];
}

interface PlayerGearCollection {
  [key: string]: SingleGearItem;
}

export default class InventoryParser {
  private inventoryType!: InventoryType;
  private inventoryContent!: string;
  private encryptedInventory!: string;
  private cryptKey!: string;
  private decryptedInventory: string;
  private parsedInventory: ParsedInventoryItem;

  constructor( inventoryType: InventoryType, inventoryContent: string ) {
    this.inventoryType = inventoryType;
    this.inventoryContent = inventoryContent;
    this.encryptedInventory = '';
    this.cryptKey = '19800216';

    this.storeDecryptedInventory();
  }


  async storeDecryptedInventory(): Promise<void> {
    let maxSize;
    let numberOfSomething;
    let encryptedInventory;

    if ( this.inventoryType === InventoryType.LOOK ) {
      [ numberOfSomething, encryptedInventory ] = this.inventoryContent.split( /[@#]/, 3 );
      maxSize = '10';
    } else {
      [ maxSize, numberOfSomething, encryptedInventory ] = this.inventoryContent.split( /[@#]/, 3 );
    }

    if ( !encryptedInventory ) {
      encryptedInventory = '';
    }

    this.encryptedInventory = encryptedInventory;
    const decryptedInventory = this.decryptInventory( encryptedInventory.trim() );
    this.decryptedInventory = decryptedInventory;

    if ( this.inventoryType === InventoryType.LOOK ) {
      return;
    }

    this.parsedInventory = this.retrieveItemsFromInventory( parseInt( maxSize ), parseInt( numberOfSomething ), decryptedInventory );
  }


  decryptInventory( encryptedInventory: string ): string {
    if ( !encryptedInventory ) {
      return;
    }
    const cryptKeyLength = this.cryptKey.length;
    const inventoryLength = encryptedInventory.length;
    let decryptedInventory = '';

    // ToP used a weird way to encrypt their inventories
    // subtract the ascii value of characters of the encrypted inventory by the ascii value of characters of the encryption key.
    for ( let i = 0; i < inventoryLength; i += 1 ) {
      const asciiDifference = encryptedInventory[ i ].charCodeAt( 0 ) - this.cryptKey[ i % cryptKeyLength ].charCodeAt( 0 );
      decryptedInventory += String.fromCharCode( asciiDifference );
    }

    return decryptedInventory;
  }

  encryptInventory( decryptedInventory: Record<string, string> ): string {
    const cryptKeyLength = this.cryptKey.length;
    const { sizeAndNo, compressedItemString } = decryptedInventory;
    const inventoryLength = compressedItemString.length;

    let encryptedInventory = '';

    for ( let i = 0; i < inventoryLength; i++ ) {
      const asciiSum = compressedItemString[ i ].charCodeAt( 0 ) + this.cryptKey[ i % cryptKeyLength ].charCodeAt( 0 );
      encryptedInventory += String.fromCharCode( asciiSum );
    }

    return `${sizeAndNo}${encryptedInventory}`;
  }

  async addItemsToInventory( items: Record<string, number>[] ): Promise<string> {
    const itemInfoParser = new ItemInfoParser( null, dataDir );

    for ( let i = 0; i < items.length; i++ ) {
      const item = items[ i ];
      const { itemId, quantity } = item;
      const itemData = await itemInfoParser.getItemInformation( itemId );
      this.addItemToInventory( itemId, quantity, itemData );
    }

    this.parsedInventory.crc = this.computeCrc( this.parsedInventory );

    const { sizeAndNo, compressedItemString } = this.compressParsedInventory();
    const finalInventoryContent = this.encryptInventory( {
      sizeAndNo,
      compressedItemString
    } );

    return finalInventoryContent;
  }

  compressParsedInventory(): Record<string, string> {
    const inventory = this.parsedInventory;
    const compressedInventory = `${inventory.maxSize}@${inventory.no}#`;

    let compressedItemString = ``;
    for ( let i = 0; i < inventory.maxSize; i++ ) {
      if ( inventory.items[ i ] !== null ) {
        compressedItemString = `${compressedItemString}${inventory.items[ i ].join( ',' )};`;
      }
    }

    const { crc } = this.parsedInventory;
    compressedItemString = `${inventory.type};${inventory.size};${compressedItemString}${crc}`;

    return {
      sizeAndNo: compressedInventory,
      compressedItemString,
    };
  }

  private addItemToInventory( itemId: number, quantity: number, item: string ): void {
    const inventory = this.parsedInventory;
    const parsedItem = JSON.parse( item );
    const durability = parsedItem.DURABILITY.split( ',' );
    const energy = parsedItem.ENERGY.split( ',' );
    let itemsAdded = 0;

    for ( let i = 0; ( i < inventory.maxSize && itemsAdded < quantity ); i++ ) {
      if ( inventory.items[ i ] === null ) {
        const finalItem = [ i, itemId, quantity, parseInt( durability[ 0 ] ), parseInt( durability[ 1 ] ), parseInt( energy[ 0 ] ), parseInt( energy[ 1 ] ), 0, 0, 0, 0 ];
        inventory.items[ i ] = finalItem;
        itemsAdded += quantity;
      }
    }

    inventory.size += itemsAdded;
  }


  retrieveItemsFromInventory( maxSize: number, numberOfSomething: number, inventory: string ): ParsedInventoryItem {
    const parsedInventory: ParsedInventoryItem = {
      no: numberOfSomething,
      maxSize,
      type: '',
      size: 0,
      crc: 0,
      items: {},
      inventoryType: this.inventoryType,
    };

    let splitInventory: string[] = [];
    if ( inventory ) {
      splitInventory = ( inventory || '' ).split( ';' );
    }

    const totalItemsInInventory = ( splitInventory ).length;
    [ parsedInventory.type ] = splitInventory;
    parsedInventory.size = parseInt( splitInventory[ 1 ] );
    parsedInventory.crc = parseInt( splitInventory[ totalItemsInInventory - 1 ] ) || 0;

    // set a 'null' flag for each slot in the player's inventory
    for ( let i = 0; i < parsedInventory.maxSize; i += 1 ) {
      parsedInventory.items[ i ] = null;
    }

    // item[ 0 ] contains the slot at which the item exists
    // set that slot = the item
    for ( let i = 2; i < totalItemsInInventory - 1; i += 1 ) {
      const item: number[] = splitInventory[ i ].split( ',' ).map( invItem => parseInt( invItem ) );
      parsedInventory.items[ item[ 0 ] ] = item;
    }

    const computedCrc = this.computeCrc( parsedInventory );

    if ( computedCrc !== parsedInventory.crc ) {
      logger.log( { level: 'error', message: `CRC Mismatch while parsing inventory: computed CRC: ${computedCrc}, actual CRC: ${parsedInventory.crc}` } );
    }

    return parsedInventory;
  }

  async retrieveItemsFromGear(): Promise<PlayerGearCollection> {
    let splitInventory: string[] = [];
    if ( this.encryptedInventory ) {
      splitInventory = ( this.encryptedInventory || '' ).split( ';' );
    }

    const playerGear: PlayerGearCollection = {};

    for ( const [ key, value ] of Object.entries( GearMap ) ) {
      playerGear[ key ] = await this.getGearInformation( splitInventory[ value ].split( ',' ) );
    }

    return playerGear;
  }

  computeCrc( inventory: ParsedInventoryItem ): number {
    const inventoryItems = inventory.items || [];
    let crc = parseInt( inventory.type );
    const totalInventoryItems = Object.keys( inventoryItems ).length;

    for ( let itemIndex = 0; itemIndex < totalInventoryItems; itemIndex += 1 ) {
      const item = inventoryItems[ itemIndex ] || [];
      const totalItemAttributes = Object.keys( item ).length;

      for ( let i = 0; i < totalItemAttributes; i += 1 ) {
        if ( i !== 0 && i !== 10 ) {
          crc += item[ i ];
        }
      }
    }

    if ( Number.isNaN( crc ) ) {
      return 0;
    }

    return crc;
  }

  async getParsedInventory(): Promise<SingleBagItem[] | ParsedInventoryItem> {
    if ( this.inventoryType === InventoryType.LOOK ) {
      return this.parsedInventory;
    }

    const itemDetails = await this.fetchAllItemDetails();
    return itemDetails;
  }

  getBagSize(): number {
    return this.parsedInventory.maxSize || 0;
  }


  async fetchAllItemDetails(): Promise<SingleBagItem[]> {
    const items = [];
    const inventoryItems = this.parsedInventory.items;
    const totalInventoryItems = Object.keys( inventoryItems ).length;

    for ( let itemIndex = 0; itemIndex < totalInventoryItems; itemIndex++ ) {
      const item = inventoryItems[ itemIndex ];
      if ( item ) {
        items.push( await this.getItemInformation( item ) );
      }
    }

    return items;
  }

  async getItemInformation( item: number[] ): Promise<SingleBagItem> {
    if ( !item || !Array.isArray( item ) ) {
      return;
    }

    const itemDetails: SingleBagItem = {
      slot: item[ AttributeMap.SLOT ],
      id: item[ AttributeMap.ID ],
      amount: item[ AttributeMap.AMOUNT ],
      itemInfo: '',
      dbAttributes: [],
    };

    const itemInfoParser = new ItemInfoParser( null, dataDir );
    const itemId = itemDetails.id;
    const itemInformation = await itemInfoParser.getItemInformation( itemId );
    itemDetails.itemInfo = JSON.parse( itemInformation );
    itemDetails.dbAttributes = item;

    return itemDetails;
  }

  async getGearInformation( item: string[] ): Promise<SingleGearItem> {
    if ( !item || !Array.isArray( item ) ) {
      return;
    }

    const itemDetails: SingleGearItem = {
      id: parseInt( item[ 0 ] ),
      itemInfo: '',
      dbAttributes: [],
    };

    const itemInfoParser = new ItemInfoParser( null, dataDir );
    const itemInformation = await itemInfoParser.getItemInformation( itemDetails.id );
    itemDetails.itemInfo = JSON.parse( itemInformation );
    itemDetails.dbAttributes = item;

    return itemDetails;
  }


  getEquipmentGemInformation( item: string[] ): void {
    const gemString = item[ 8 ];

    if ( !gemString ) {
      return;
    }


    console.log( gemString );
  }

  isInventoryFull(): boolean {
    let totalOccupiedSlots = 0;
    const { items } = this.parsedInventory;

    _.forEach( items, ( value ) => {
      if ( value !== null ) {
        totalOccupiedSlots += 1;
      }
    } );

    if ( totalOccupiedSlots >= this.parsedInventory.maxSize ) {
      return true;
    }

    return false;
  }
}
