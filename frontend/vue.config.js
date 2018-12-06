module.exports = {
  configureWebpack: {
    entry: './src/app.js',
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
