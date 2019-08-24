// import required packages
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import schema from "./graphql/schema/schema";
import csurf from 'csurf';
import path from 'path';

import { errorHandlerMiddleware } from "./helpers/errorHandler";
import { ApolloServer } from "apollo-server-express";
import { authMiddleware } from "./helpers/authHelpers";
// initialize environment variables
env.config();

// initialize express app
const app = express();

// const csrfMiddleware = csurf( {
//   cookie: true
// } );

const server = new ApolloServer( {
  schema,
  context: authMiddleware
} );

const urlWhitelist = [ 'http://localhost', 'http://localhost:8080', 'http://localhost:5000', 'http://192.168.1.16:5000', 'http://26.104.18.71:8080' ];

const corsOptions = {
  credentials: true,
  origin: ( origin, callback ) => {
    if ( process.env.NODE_ENV === 'dev' ) {
      callback( null, true );
    } else {
      if ( urlWhitelist.includes( origin ) ) {
        callback( null, true );
      } else {
        callback( new Error('Restricted by CORS' ) );
      }
    }

  }
};
const apiPath = "/graphql";

app.use( '/assets', express.static( 'dist/assets' ) );
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'dist/index.html' ) );
} );
app.use( cookieParser() );
app.use( cors( corsOptions ) );
app.use( errorHandlerMiddleware );
app.use( morgan( "combined" ) );


server.applyMiddleware( { app, cors: false } );

module.exports = app;
