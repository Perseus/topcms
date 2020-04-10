const crypto = require( 'crypto' );
const fs = require( 'fs' );
const serialize = require( 'serialize-javascript' );

const { ItemInfoAttributeMap } = require( '../config/ItemInfoItemAttributes' );
const TError = require( './TError' );

module.exports = class ItemInfoParser {
  constructor( fileData, filePath ) {
    this.fileData = fileData;
    this.filePath = filePath;
  }


  async parseFileData( cb ) {
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

    await this.setCurrentChecksum( fileHash );

    for ( const item of items ) {
      if ( item.includes( '//' ) ) {
        continue;
      }

      const itemDetails = item.split( '\t' );
      await this.writeItemData( itemDetails );
      currentItem += 1;
      if ( currentItem % 100 === 0 || currentItem === totalItems ) {
        cb( { currentItem, totalItems } );
      }
    }
  }


  async getCurrentChecksum() {
    try {
      const file = await fs.promises.readFile( `${this.filePath}/ItemInfoCache/checksum.dat`, 'utf-8' );
      return file;
    } catch ( err ) {
      return null;
    }
  }

  async writeItemData( itemData ) {
    try {
      const itemId = parseInt( itemData[ ItemInfoAttributeMap.ID ], 10 );
      await fs.promises.writeFile( `${this.filePath}/ItemInfoCache/${itemId}.dat`, serialize( itemData ), 'utf-8' );
    } catch ( err ) {
      throw new TError( {
        code: 'cache.WRITE_ERROR',
        message: 'There was an error while trying to write the item data'
      } );
    }
  }

  async setCurrentChecksum( checksum ) {
    try {
      await fs.promises.writeFile( `${this.filePath}/ItemInfoCache/checksum.dat`, checksum );
    } catch ( err ) {
      return err;
    }
  }

  generateFileChecksum() {
    return new Promise( ( resolve, reject ) => {
      const hash = crypto.createHash( 'sha1' );
      const rs = fs.createReadStream( `${this.filePath}/ItemInfo.txt` );
      rs.on( 'error', reject );
      rs.on( 'data', chunk => hash.update( chunk ) );
      rs.on( 'end', () => resolve( hash.digest( 'hex' ) ) );
    } );
  }

  async getItemInformation( itemId ) {
    try {
      const fileData = await fs.promises.readFile( `${this.filePath}/ItemInfoCache/${itemId}.dat`, 'utf-8' );
      return fileData;
    } catch ( err ) {
      return null;
    }
  }
};
