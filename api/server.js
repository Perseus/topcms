import http from 'http';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.port || 3000;

http.createServer( app ).listen( port, () => {
  console.log( ` 🚀 Running server on port ${port} ` );
} );
