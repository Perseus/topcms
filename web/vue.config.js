const webpack = require( 'webpack' );
const shell = require( 'shelljs' );
const constants = require( './build/Constants' );

module.exports = {
  publicPath: '/',
  assetsDir: 'assets/',
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
    ]
  },
  chainWebpack: ( config ) => {
    config.output.filename( 'bundle.js' );

    config.plugin( 'progress' )
      .use( webpack.ProgressPlugin, [ bundleCopyHandler ] );
  }
};


function isRunningInDevMode() {
  return ( process.env.NODE_ENV === 'development' );
}

function isBuildingProd() {
  return ( process.env.NODE_ENV === 'production' );
}

function bundleCopyHandler( percentage, message ) {
  if ( percentage === 1 ) {
    console.log( '-- Copying bundle to API directory -- ' );
    if ( isRunningInDevMode() ) {
      shell.mkdir( constants.DEV_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'dist/*', constants.DEV_BUNDLE_COPY_DIRECTORY );
    } else {
      shell.mkdir( constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'dist/*', constants.PROD_BUNDLE_COPY_DIRECTORY );
    }
  }
}
