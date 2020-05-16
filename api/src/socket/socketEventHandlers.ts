// const { promises: fs } = require( 'fs' );
// const path = require( 'path' );

// const SocketEvents = require( './SocketEvents' );
// const ItemInfoParser = require( '../utils/ItemInfoParser' );
import { promises as fs } from 'fs';
import path from 'path';

import SocketEvents from './SocketEvents';
import ItemInfoParser from '../utils/ItemInfoParser';

const dataDir = path.join( __dirname, '..', 'data' );

const socketEventHandlers = {
  [ SocketEvents.START_ITEM_INFO_CACHE ]: async( socket, args ) => {
    try {
      const itemInfoPath = dataDir;
      const itemInfo = await fs.readFile( `${itemInfoPath}/ItemInfo.txt`, 'utf-8' );
      const itemInfoParser = new ItemInfoParser( itemInfo, itemInfoPath );

      await itemInfoParser.parseFileData( ( items ) => {
        socket.emit( 'itemCached', {
          currentItem: items.currentItem,
          totalItems: items.totalItems
        } );
      } );
      socket.emit( 'itemCacheFinished' );
    } catch ( err ) {
      console.log( err, dataDir );
      socket.emit( 'failed', {
        message: 'There was an error while trying to parse the ItemInfo file',
        error: err,
      } );
    }
  }
};

module.exports = socketEventHandlers;
