const webpack = require( 'webpack' );
const shell = require( 'shelljs' );
const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );

const constants = require( './build/Constants' );

module.exports = {
  publicPath: '/',

  assetsDir: 'assets/',

  productionSourceMap: false,

  filenameHashing: false,

  configureWebpack: {
    // devtool: 'cheap-module-eval-source-map',
    output: {
      filename: 'frontend/[name].js',
      chunkFilename: 'frontend/[name].js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      // new BundleAnalyzerPlugin(),
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
        name: true,
      },
    },

  },

  css: {
    extract: false,
  },

  outputDir: 'dist',
  devServer: {
    disableHostCheck: true,
    port: 3001,
    contentBase: path.join( __dirname, 'dist' ),
    hot: true,
    clientLogLevel: 'info',
    compress: true,
  },
  chainWebpack: ( config ) => {
    // config.output.filename( 'bundle.js' );

    config.plugin( 'progress' )
      .use( webpack.ProgressPlugin, [ bundleCopyHandler ] );

    config.plugins.delete( 'prefetch' );

    config.resolve.alias
      .set( '@containers', path.resolve( __dirname, 'src/containers' ) )
      .set( '@services', path.resolve( __dirname, 'src/services' ) )
      .set( '@store', path.resolve( __dirname, 'src/store' ) )
      .set( '@components', path.resolve( __dirname, 'src/components' ) )
      .set( '@utils', path.resolve( __dirname, 'src/utils' ) );
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
      shell.rm( '-rf', `${constants.PROD_BUNDLE_COPY_DIRECTORY}/frontend` );
      shell.cp( '-R', 'dist/frontend/*', constants.PROD_BUNDLE_COPY_DIRECTORY );
      shell.cp( '-R', 'public/img/*', `${constants.PROD_BUNDLE_COPY_DIRECTORY}/assets/img` );
    }
  }
  return percentage;
}
