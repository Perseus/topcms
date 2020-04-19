interface TErrorInterface {
  code: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

export default class TError extends Error {
  public code: string;
  public message: string;
  public params: Record<string, string>;


  constructor( error: TErrorInterface ) {
    super( error.message );

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf( this, TError.prototype );

    this.code = error.code;
    this.name = 'TError';
    this.message = error.message;
    this.params = error.params;
    this.stack = ( new Error( error.message ) ).stack;
  }
}
