(function (global) {
    let webpack = require("webpack");
    let helpers = require("../helpers");

    module.exports = {
        entry: { "index": "./index.ts" },

        output: {
            path: helpers.root("lib"),
            filename: "[name].js",
            pathinfo: true,
            publicPath: "/"
        },

        resolve: {
            extensions: ["", ".ts", ".js"]
        },

        module: {
            loaders: [{
                test: /\.ts$/,
                loaders: ["ts-loader?configFileName=config/ts/lib.json", "angular2-template-loader"]
            }, {
                test: /\.(html|css)$/,
                loader: "raw-loader"
            }]
        },

        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ]
    };
})(this);
