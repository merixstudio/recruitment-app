const path = require('path');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'tests.webpack.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          app: path.resolve(__dirname, '../app'),
        },
      },
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
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
  });
};
