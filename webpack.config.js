const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: '9000'
  },
  output: {
    clean: true,
    filename: `bundle[hash].js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HtmlWebpackPlugin',
      template: "./src/index.html",
      filename: "index.html"
    }),
    // new MiniCssExtractPlugin({
    //   filename: './style/[name].[contenthash].css',
    // }),
  ]
}
