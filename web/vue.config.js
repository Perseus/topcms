const webpack = require( 'webpack' );
const shell = require( 'shelljs' );
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const constants = require( './build/Constants' );

module.exports = {
  publicPath: '/',

  assetsDir: 'assets/',

  productionSourceMap: false,

  filenameHashing: false,

  configureWebpack: {
    devtool: 'cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    plugins: [
      new CleanWebpackPlugin(),
    ]
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

    config.resolve.alias
      .set( '@containers', path.resolve( __dirname, 'src/containers' ) )
      .set( '@services', path.resolve( __dirname, 'src/services' ) )
      .set( '@store', path.resolve( __dirname, 'src/store' ) )
      .set( '@components', path.resolve( __dirname, 'src/components' ) );
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

    if ( isBuildingProd() ) {
      shell.mkdir( constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'dist/*', constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'public/img/*', `${constants.PROD_BUNDLE_COPY_DIRECTORY}/assets/img` );
    }
  }
  return percentage;
}
