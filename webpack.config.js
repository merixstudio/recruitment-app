const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './app/index.jsx',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app'),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
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
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './app/images'),
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './app/fonts'),
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new ExtractTextPlugin({
      filename: 'bundle.css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true,
    port: 4000,
  },
};
