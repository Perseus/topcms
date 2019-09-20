export default class ItemInfoParser {

  constructor( fileData ) {
    this.fileData = fileData;

    this.parseFileData();
  }


  parseFileData() {
    const fileData = this.fileData;
    const items = fileData.split('\n');
    
    for ( let item of items ) {
      if( item.includes( '//' ) ) {
        continue;
      }
      
      const itemDetails = item.split('\t');
      console.log( itemDetails );
      break;
    }
  }

}