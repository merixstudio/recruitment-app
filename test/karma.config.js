const path = require('path');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'unit/**/*.js',
      'unit/**/*.jsx',
    ],
    exclude: [
    ],
    preprocessors: {
      '../app/**/*.js': ['webpack'],
      '../app/**/*.jsx': ['webpack'],
      './**/*.js': ['webpack'],
      './**/*.jsx': ['webpack'],
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          app: path.resolve(__dirname, '../app'),
        },
      },
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
            test: /\.css$/,
            use: [{
              loader: 'css-loader',
              options: {
                ourceMap: true,
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
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  });
};
