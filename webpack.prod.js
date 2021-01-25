// @TODO: some nicer way of setting paths 
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "index.[contenthash].js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({
        filename: "/style.[contenthash].css"
    })],

    module: {
      rules : [
        {
          test: /\.scss$/,
          use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader"
                ]
        }
      ]
    }
})