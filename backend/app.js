// import required packages
import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import expressJwt from 'express-jwt';
import schema from './graphql/schema/schema';
import { errorHandlerMiddleware } from './helpers/errorHandler';
import graphqlHTTP from 'express-graphql';
import { authMiddleware } from './helpers/authHelpers';
// initialize environment variables
env.config();

// initialize express app
const app = express();

const jwtMiddleware = expressJwt( {
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
} );

app.use( cookieParser() );
app.use( cors() );
app.use( errorHandlerMiddleware );
app.use( morgan( 'combined' ) );
app.use( jwtMiddleware );
// app.use( authMiddleware );
app.get( '/jwt', ( req, res, next ) => {

} );

app.use(
  '/graphql',
  graphqlHTTP( {
    schema,
    graphiql: true,
  } ),
);

module.exports = app;
