/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  //...
  devServer: {
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    static: "./dist",
  },
});
