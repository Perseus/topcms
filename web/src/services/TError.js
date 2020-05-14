export default class TError extends Error {
  constructor( error ) {
    super( error.message );

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf( this, TError.prototype );

    this.code = error.code;
    this.name = 'TError';
    this.message = error.message;
    this.params = error.params;
    this.success = error.success;
    this.errors = error.errors;
    this.stack = ( new Error( error.message ) ).stack;
  }
}
