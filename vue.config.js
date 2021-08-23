const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  publicPath: process.env.VUE_APP_RESOURCES_URL,

  // devServer: {
  //   writeToDisk: true
  // },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new CopyWebpackPlugin([
        {
          from:
            "node_modules/@esri/calcite-components/dist/calcite/assets",
          to: "assets"
        }
      ])
    ]
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
