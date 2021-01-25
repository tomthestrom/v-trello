// @TODO: some nicer way of setting paths 
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { WebpackPluginServe } = require('webpack-plugin-serve');
const outputPath = path.resolve(__dirname, "public/javascripts");

module.exports = merge(common, {
     entry: [
      'webpack-plugin-serve/client' // ← important: this is required, where the magic happens in the browser
    ],
    mode: "development",
    output: {
        filename: "index.js",
        path: outputPath
        },
    plugins: [
      new WebpackPluginServe({
        static:  path.resolve(__dirname, "public")
      })
    ],
    // important: webpack and the server
    // will continue to run in watch mode
    watch: true,
    module: {
      rules : [
        {
          test: /\.scss$/,
          use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
                ]
        }
      ]
    }
  });