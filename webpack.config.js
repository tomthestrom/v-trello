const path = require("path");
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "assets/js/index.js"),
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public/javascripts")
    },
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
}