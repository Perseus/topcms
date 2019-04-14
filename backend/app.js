// import required packages
import env from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import schema from "./graphql/schema/schema";
import { errorHandlerMiddleware } from "./helpers/errorHandler";
import { ApolloServer } from "apollo-server-express";
import { authMiddleware } from "./helpers/authHelpers";

// initialize environment variables
env.config();

// initialize express app
const app = express();

const server = new ApolloServer( {
  schema,
  context: authMiddleware
} );

const apiPath = "/graphql";

app.use( cookieParser() );
app.use( cors() );
app.use( errorHandlerMiddleware );
app.use( morgan( "combined" ) );

server.applyMiddleware( { app } );

module.exports = app;
