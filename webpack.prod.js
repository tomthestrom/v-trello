// @TODO: some nicer way of setting paths 
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "index.[contenthash].js",
        path: path.resolve(__dirname, "public/javascripts")
    },
})