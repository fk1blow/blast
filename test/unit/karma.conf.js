var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome, PhantomJS

    singleRun: true, //just run once by default

    files: [
      './index.js' //just load this file
    ],

    frameworks: ['jasmine', 'es6-shim'],


    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: [
      'spec'
    ],

    specReporter: {
      suppressErrorSummary: true,
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    webpackMiddleware: {
        quiet: true,
        noInfo: true,
        stats: 'errors-only'
    },

    noResolve: false
  });
};
