const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // publicPath: '/wsor_map/',

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
};
