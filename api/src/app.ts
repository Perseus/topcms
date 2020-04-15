// import required packages
import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';

import { errorHandlerMiddleware } from './helpers/errorHandler';
import schema from './graphql/schema/schema';
import { authMiddleware } from './helpers/authHelpers';
import routes from './routes';


// initialize environment variables
env.config();

// initialize express app
const app = express();

const server = new ApolloServer( {
  schema,
  context: authMiddleware,
  debug: ( process.env.NODE_ENV !== 'production' ),
} );

const urlWhitelist = [ 'http://localhost:3000', 'http://localhost:8080', process.env.APP_URL ];

const corsOptions = {
  credentials: true,
  origin: ( origin: string, callback: Function ): void => {
    if ( process.env.NODE_ENV === 'development' ) {
      callback( null, true );
    } else if ( urlWhitelist.includes( origin ) ) {
      callback( null, true );
    } else {
      callback( new Error( 'Restricted by CORS' ) );
    }
  }
};

const frontendDirectory = path.join( __dirname, '../dist/dist' );

app.use( cookieParser() );
app.use( cors( corsOptions ) );
app.use( errorHandlerMiddleware );
app.use( morgan( 'combined' ) );

app.use( '/api', routes );
app.use( '/assets', express.static( `${frontendDirectory}/assets` ) );
app.use( '/img', express.static( `${frontendDirectory}/img` ) );

// TODO: Change the way bundling works on the frontend, use server to render the bundle
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, '../dist/dist/index.html' ) );
} );


server.applyMiddleware( { app, cors: false } );

export default app;
