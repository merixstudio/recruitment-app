const webpackDev = require('../webpack.config.js');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'tests.main.js',
    ],
    preprocessors: {
      'tests.main.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      resolve: webpackDev.resolve,
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader?plugins=rewire',
              },
            ],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|test|request.js)/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: {
                esModules: true,
                produceSourceMap: true,
              },
            },
            enforce: 'post',
          },
          {
            test: /\.css$/,
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            }],
          },
          {
            test: /\.scss$/,
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            }],
          },
        ],
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom',
      },
    },
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage-istanbul-reporter',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
    ],
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      reports: ['text', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['mocha', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
