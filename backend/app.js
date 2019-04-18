// import required packages
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import schema from "./graphql/schema/schema";
import csurf from 'csurf';
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

const urlWhitelist = [ 'http://localhost', 'http://localhost:8080' ];

const corsOptions = {
  credentials: true,
  origin: urlWhitelist
};
const apiPath = "/graphql";
app.use( cookieParser() );
app.use( cors( corsOptions ) );
app.use( errorHandlerMiddleware );
app.use( morgan( "combined" ) );


server.applyMiddleware( { app, cors: false } );

module.exports = app;
