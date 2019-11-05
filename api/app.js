// import required packages
const env = require( 'dotenv' );
const express = require( 'express' );
const cors = require( 'cors' );
const cookieParser = require( 'cookie-parser' );
const morgan = require( 'morgan' );
const csurf = require( 'csurf' );
const path = require( 'path' );

const { ApolloServer } = require( 'apollo-server-express' );
const { errorHandlerMiddleware } = require( './helpers/errorHandler' );
const schema = require( './graphql/schema/schema' );
const { authMiddleware } = require( './helpers/authHelpers' );
const routes = require( './routes' );

// initialize environment variables
env.config();

// initialize express app
const app = express();

// const csrfMiddleware = csurf( {
//   cookie: true
// } );

const server = new ApolloServer( {
  schema,
  context: authMiddleware,
} );

const urlWhitelist = [ 'http://localhost', 'http://localhost:8080' ];

const corsOptions = {
  credentials: true,
  origin: ( origin, callback ) => {
    if ( process.env.NODE_ENV === 'dev' ) {
      callback( null, true );
    } else if ( urlWhitelist.includes( origin ) ) {
      callback( null, true );
    } else {
      callback( new Error( 'Restricted by CORS' ) );
    }
  }
};

const apiPath = '/graphql';

app.use( cookieParser() );
app.use( cors( corsOptions ) );
app.use( errorHandlerMiddleware );
app.use( morgan( 'combined' ) );

app.use( '/api', routes );
app.use( '/assets', express.static( 'dist/assets' ) );
app.use( '/img', express.static( 'dist/img' ) );
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'dist/index.html' ) );
} );


server.applyMiddleware( { app, cors: false } );

module.exports = app;
