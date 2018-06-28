const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')

module.exports = (env, argv) => ({
  entry: {
    'app.js': './src/index.js',
    'second/second.js': './src/second/second.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          // use style-loader in dev
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['app.js']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './second/index.html',
      chunks: ['second/second.js']
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
});
