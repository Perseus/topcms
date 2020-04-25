const webpack = require( 'webpack' );
const shell = require( 'shelljs' );
const path = require( 'path' );
const constants = require( './build/Constants' );

module.exports = {
  publicPath: '/',

  assetsDir: 'assets/',

  productionSourceMap: false,

  configureWebpack: {
    devtool: 'cheap-module-eval-source-map',
  },

  css: {
    extract: false,
  },

  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    port: 3001,
    writeToDisk: ( fileName ) => {
      if ( fileName.includes( 'png' ) || fileName.includes( 'jpg' ) ) {
        return false;
      }
      return true;
    },
    contentBase: path.join( __dirname, 'dist' ),
  },
  chainWebpack: ( config ) => {
    // config.output.filename( 'bundle.js' );

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

function bundleCopyHandler( percentage, message, ...args ) {
  console.log( message, ...args );
  if ( percentage === 1 ) {
    console.log( '-- Copying bundle to API directory -- ' );
    shell.rm( '-rf', 'dist/img' );

    if ( isRunningInDevMode() ) {
      shell.mkdir( constants.DEV_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'dist/*', constants.DEV_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'public/img/*', `${constants.DEV_BUNDLE_COPY_DIRECTORY}/assets/img` );
    } else {
      shell.mkdir( constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'dist/*', constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'public/img/*', `${constants.PROD_BUNDLE_COPY_DIRECTORY}/assets/img` );
    }
  }
  return percentage;
}
