(function() {
  module.exports = {
    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
      rules: [{
        test: /\.ts$/,
        loaders: [{ loader: 'ts-loader', options: { configFile: 'config/ts/tests.json' } }, 'angular2-template-loader']
      }, {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }]
    }
  }
})();
