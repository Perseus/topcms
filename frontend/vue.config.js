module.exports = {
  configureWebpack: {
    entry: './src/app.js',
    node : {
      __filename: true,
      __dirname: true,
    },
    performance: { 
      hints: false
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
