/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const fs = require("fs");

module.exports = merge(common, {
  //...
  devServer: {
    client: {
      https: true,
      overlay: {
        errors: false,
        warnings: false,
      },
      https: {
        key: fs.readFileSync("./localhost-key.pem"),
        cert: fs.readFileSync("./localhost.pem"),
        ca: fs.readFileSync(
          "/Users/jeka/Library/Application Support/mkcert/rootCA-key.pem"
        ),
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
