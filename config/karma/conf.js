(function () {
  let webpackConfig = require('../webpack/tests');

  module.exports = function (config) {
    let _config = {
      basePath: '',

      frameworks: ['jasmine'],

      files: [
        { pattern: './test.shim.js', watched: false }
      ],

      preprocessors: {
        './test.shim.js': ['webpack', 'sourcemap']
      },

      webpack: webpackConfig,

      webpackMiddleware: {
        stats: 'errors-only'
      },

      webpackServer: {
        noInfo: true
      },

      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chrome'],
      customLaunchers: {
        ChromeHeadlessCI: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },
      singleRun: true
    };

    config.set(_config);
  };
})();
