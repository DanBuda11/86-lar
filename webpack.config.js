const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jp(e*)g|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/views/index.html',
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080',
      },
      {
        reload: false,
      }
    ),
    new CopyWebpackPlugin([
      {
        from: './*',
        test: /\.(png|xml|ico|svg|webmanifest)$/,
        ignore: [
          '86-lar-small.png',
          '.babelrc',
          '.gitignore',
          '*.json',
          '*.js',
          '*.md',
        ],
      },
    ]),
  ],
};
