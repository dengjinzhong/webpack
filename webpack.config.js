const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: ["web", "es5"],
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: '9000'
  },
  output: {
    clean: true,
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: path.resolve(__dirname, './loader/replaceLoader.js'),
            options: {
              name: '世界123'
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                useBuiltIns: 'usage'
              }]]
            }
          }
        ]
      },
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
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
              limit: 10000000
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        jquery: {
          name: 'jquery',
          test: /[\\/]node_modules[\\/]_?jquery(.*)/,
          priority: 10,
          reuseExistingChunk: true,
          filename: "jquery-[chunkhash].min.js"
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: "vendors-[chunkhash].js"
        },
        utils: {
          name: 'utils',
          test: path.resolve(__dirname, './src/utils'),
          priority: -15,
          reuseExistingChunk: true,
          filename: "utils-[chunkhash].js"
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
          filename: "common-[hash].js"
        },
      },
    }
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
