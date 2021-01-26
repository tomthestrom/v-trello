// @TODO: some nicer way of setting paths
//@TODO: add file loader 
//@TODO possibly a minimizer
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [path.resolve(__dirname, "assets/js/index.js")],
    output: {
        filename: "index.[contenthash].js",
        path: path.resolve(__dirname, "public")
    },
    plugins: [new HtmlWebpackPlugin({
       template: path.resolve(__dirname, "views/index.ejs"),
       filename: 'index.html'
        })
    ]
}