const { ValidationError } = require( 'apollo-server' );

function isUnique( model, field, value ) {
  return new Promise( ( resolve, reject ) => {
    model.findOne( {
        where: {
          [ field ]: value,
        }
      } ).then( ( resultObject ) => {
        if ( resultObject ) {
          reject( new ValidationError( `${field.toUpperCase()}_EXISTS` ) );
        }
        resolve();
      } )
      .catch( err => reject( err ) );
  } );
};

module.exports = {
  isUnique,
};