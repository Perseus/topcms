class GraphError extends Error {

  constructor( message, type, source ) {
    super( message );
    this.message = message;
    this.type = type;
    this.source = source;
    this.name = 'graphErro';
    this.stack = ( new Error( message ) ).stack;
  }

}


module.exports =  GraphError;