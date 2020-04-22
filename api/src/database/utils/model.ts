import {
  Model, Promise as BluebirdPromise, FindOptions
} from 'sequelize';
import TError from '../../utils/TError';


export interface OverridenFindOptions extends FindOptions {
  /**
   * Throw if nothing was found.
   */
  rejectOnEmpty?: boolean | Error;
}

/**
 * We're extending Sequelize's base Model class here in case we want to override some functionality
 * that exists on all models instead of going to every model and implementing it there.
 */
export default class BaseModel extends Model {
  /**
   * We're overriding the findOne functionality to throw a custom error if a result was not found in the DB instead of sequelize's default error
   */
  public static findOne<M extends BaseModel>( this: { new (): M } & typeof Model, options: OverridenFindOptions = { rejectOnEmpty: true } ): BluebirdPromise<M | null> {
    return super.findOne.call( this, options ).then( ( result: M ) => result )
      .catch( ( err: any ) => {
        const { name } = err;

        switch ( name ) {
          case 'SequelizeEmptyResultError':
            throw new TError( {
              code: `${this.name.toLowerCase()}.NOT_FOUND`,
              message: `${this.name} not found`,
            } );
          default:
            throw new Error( err );
        }
      } );
  }
}
