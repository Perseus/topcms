const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const api = require( './src/api' );

const app = express();


app.set( 'view engine', 'pug' );
app.set( 'views', path.join( __dirname, '/views' ) );
app.use( bodyParser.json() );

app.use( '/api', api );
app.use( '/assets', express.static( path.join( __dirname, 'assets/' ) ) );
app.get( '*', ( req, res ) => {
  res.render( 'index', { pageTitle: 'topCMS Installation Wizard', } );
} );

app.listen( 4000, () => {
  console.log( 'Installation wizard is now running. Visit http://localhost:4000 to access it' );
} );
