const { createLogger, format, transports } = require( 'winston' );
const path = require( 'path' );

const errorsFilePath = path.join( 'dist/logs', 'errors.log' );
const actionsFilePath = path.join( 'dist/logs', 'actions.log' );

const logger = createLogger( {
  level: 'info',
  format: format.combine(
    format.timestamp( {
      format: 'YYYY-MM-DD HH:mm:ss'
    } ),
    format.errors( { stack: true } ),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'topCMS' },
  transports: [
    new transports.File( { filename: errorsFilePath, level: 'error' } ),
    new transports.File( { filename: actionsFilePath, level: 'debug' } )
  ]
} );

if ( process.env.NODE_ENV !== 'prod' ) {
  logger.add( new transports.Console( {
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  } ) );
}

module.exports = logger;
