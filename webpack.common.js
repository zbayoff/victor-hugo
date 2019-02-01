const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  mode: 'development',

  // entry: ['./src/index.js', './src/scss/main.scss'],
  entry: {
    home: './src/js/home.js',
    tech: './src/js/tech.js'
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [{
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[hash].[ext]'
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'css-loader', 'postcss-loader', 'sass-loader', ],
      },
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),

    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(process.cwd(), 'site/data'),
      prettyPrint: true
    }),

    new CopyWebpackPlugin([{
      from: './src/fonts/',
      to: 'fonts/',
      flatten: true
    }])
  ]
};
