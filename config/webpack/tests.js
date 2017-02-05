(function () {
    module.exports = {
        devtool: 'inline-source-map',

        resolve: {
            extensions: ['', '.ts', '.js']
        },

        module: {
            loaders: [{
                test: /\.ts$/,
                loaders: ['ts-loader?configFileName=config/ts/tests.json', 'angular2-template-loader']
            }, {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            }]
        }
    }
})();
