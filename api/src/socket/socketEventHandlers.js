const { promises: fs } = require( 'fs' );
const path = require( 'path' );

const SocketEvents = require( './SocketEvents' );
const ItemInfoParser = require( '../utils/ItemInfoParser' );

const socketEventHandlers = {
  [ SocketEvents.START_ITEM_INFO_CACHE ]: async ( socket, args ) => {
    try {
      const itemInfoPath = path.join( 'data' );
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
      socket.emit( 'failed', {
        message: 'There was an error while trying to parse the ItemInfo file',
        error: err,
      } );
    }
  }
};

module.exports = socketEventHandlers;
