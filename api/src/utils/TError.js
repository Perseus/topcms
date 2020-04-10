class TError extends Error {
  constructor( error ) {
    super( error.message );
    this.code = error.code;
    this.name = 'TError';
    this.message = error.message;
    this.params = error.params;
    this.stack = ( new Error( error.message ) ).stack;
  }
}

module.exports =  TError;
