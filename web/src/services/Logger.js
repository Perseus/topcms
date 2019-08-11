export default {
  log( text, type = 'error' ) {
    if ( process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'test' ) {
      return;
    }
    let color = '';
    let textColor = '#FFFFFF';
    if ( type === 'error' ) {
      color = 'hsl(348, 100%, 61%)';
    } else if ( type === 'success' ) {
      color = 'hsl(141, 71%, 48%)';
    } else if ( type === 'warning' ) {
      color = 'hsl(48, 100%, 67%)';
      textColor = '#000000';
    }

    console.log( `%c topCMS Logger %c ${text}`, `background-color: ${color}; color: ${textColor}`, 'color: #000000' );
  }
};
