let path = require("path");
let webpack = require("webpack");

module.exports = {
    entry: [
        "babel-polyfill",
        "./src/main"
    ],
    output: {
        filename: "./dist/[name].bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            },
            {
                
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                loader: "handlebars-loader",
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.handlebars$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    }
};
