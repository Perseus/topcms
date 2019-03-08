module.exports = {
  baseUrl: '',
  configureWebpack: {
    entry: './src/app.js',
    node : {
      __filename: true,
      __dirname: true,
    },
    performance: { 
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader'
          ]
        }
      ] 
    }
  },
  css : {
    modules: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/_main.scss";
        `
      }
    }
  },
  runtimeCompiler: true,
};
