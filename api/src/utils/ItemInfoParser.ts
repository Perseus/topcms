import crypto from 'crypto';
import fs from 'fs';
import { ItemInfoAttributeMap, serializeItemData } from '../config';

import TError from './TError';

export default class ItemInfoParser {
  private fileData!: string;
  private filePath!: string;

  constructor( fileData: string, filePath: string ) {
    this.fileData = fileData;
    this.filePath = filePath;
  }

  async parseFileData( cb: Function ): Promise<void> {
    const { fileData } = this;
    const items = fileData.split( '\n' );
    const currentChecksum = await this.getCurrentChecksum();
    const fileHash = await this.generateFileChecksum();
    const totalItems = items[ 0 ].includes( '//' ) ? items.length - 1 : items.length;
    let currentItem = 1;

    if ( currentChecksum && currentChecksum === fileHash ) {
      throw new TError( {
        code: 'cache.CHECKSUM_LATEST',
        message: 'Cache checksum is already up to date'
      } );
    }

    if ( items[ 1 ] && items[ 1 ].length < 90 ) {
      throw new TError( {
        code: 'cache.UNKNOWN_ITEMINFO',
        message: 'Unknown iteminfo format'
      } );
    }


    for ( const item of items ) {
      if ( !item.includes( '//' ) ) {
        const itemDetails = item.split( '\t' );
        await this.writeItemData( itemDetails );
        currentItem += 1;
        if ( currentItem % 100 === 0 || currentItem === totalItems ) {
          cb( { currentItem, totalItems } );
        }
      }
    }

    // await this.setCurrentChecksum( fileHash );
  }

  async getCurrentChecksum(): Promise<string> {
    try {
      const file = await fs.promises.readFile( `${this.filePath}/ItemInfoCache/checksum.dat`, 'utf-8' );
      return file;
    } catch ( err ) {
      return null;
    }
  }

  async writeItemData( itemData: string[] ): Promise<void> {
    try {
      const itemId = parseInt( itemData[ ItemInfoAttributeMap.ID ], 10 );
      await fs.promises.writeFile( `${this.filePath}/ItemInfoCache/${itemId}.dat`, serializeItemData( itemData ), 'utf-8' );
    } catch ( err ) {
      console.log( err );
      throw new TError( {
        code: 'cache.WRITE_ERROR',
        message: 'There was an error while trying to write the item data'

      } );
    }
  }

  async setCurrentChecksum( checksum: string ): Promise<void> {
    try {
      await fs.promises.writeFile( `${this.filePath}/ItemInfoCache/checksum.dat`, checksum );
    } catch ( err ) {
      return err;
    }
  }

  generateFileChecksum(): Promise<string> {
    return new Promise( ( resolve, reject ) => {
      const hash = crypto.createHash( 'sha1' );
      const rs = fs.createReadStream( `${this.filePath}/ItemInfo.txt` );
      rs.on( 'error', reject );
      rs.on( 'data', chunk => hash.update( chunk ) );
      rs.on( 'end', () => resolve( hash.digest( 'hex' ) ) );
    } );
  }

  async getItemInformation( itemId: number ): Promise<string> {
    try {
      const fileData = await fs.promises.readFile( `${this.filePath}/ItemInfoCache/${itemId}.dat`, 'utf-8' );
      return fileData;
    } catch ( err ) {
      return null;
    }
  }
}
