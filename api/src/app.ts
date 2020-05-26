// import required packages
import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import pug from 'pug';
import depthLimit from 'graphql-depth-limit';

import schema from './graphql/schema/schema';
import { authMiddleware } from './helpers/authHelpers';
import routes from './routes';


// initialize environment variables
env.config( {
  path: path.join( __dirname, '..', '.env' )
} );

// initialize express app
const app = express();

export const server = new ApolloServer( {
  schema,
  context: authMiddleware,
  debug: ( process.env.NODE_ENV !== 'production' ),
  validationRules: [ depthLimit( 5 ) ]
} );

const urlWhitelist = [ 'http://localhost:3000', 'http://localhost:3001', process.env.APP_URL ];

const corsOptions = {
  credentials: true,
  origin: ( origin: string, callback: Function ): void => {
    if ( process.env.NODE_ENV === 'development' ) {
      callback( null, true );
    } else if ( urlWhitelist.includes( origin ) || !origin ) {
      callback( null, true );
    } else {
      callback( new Error( `Restricted by CORS ${origin} ${JSON.stringify( urlWhitelist )}, ${JSON.stringify( process.env )}` ) );
    }
  },
  optionsSuccessStatus: 200,
};

const frontendDirectory = path.join( __dirname, 'frontend' );

app.set( 'view engine', 'pug' );
app.set( 'views', path.join( __dirname, 'views' ) );
app.use( cookieParser() );
app.use( cors( corsOptions ) );
app.options( '*', cors( corsOptions ) );
app.use( morgan( 'combined' ) );

app.use( '/api', routes );
app.use( '/frontend', express.static( frontendDirectory ) );
app.use( '/assets', express.static( `${frontendDirectory}/assets` ) );
app.use( '/img', express.static( `${frontendDirectory}/assets/img/` ) );

app.get( '/*', ( req, res ) => {
  res.render( 'index', { pageTitle: 'topCMS' } );
} );


server.applyMiddleware( { app, cors: false } );

export default app;
