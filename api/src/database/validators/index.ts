import { ValidationError } from 'apollo-server';
import { Model } from 'sequelize/types';

function isUnique( model: Model, field, value ): Promise<void> {
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
}

export {
  isUnique
};
