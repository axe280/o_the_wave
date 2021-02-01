const webpack =  require('webpack')
const fs = require('fs')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = baseWebpackConfig.externals.paths
const PAGES_DIR = `${PATHS.src}/templates`
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".html"))

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: PATHS.dist,
    host: 'localhost',
    disableHostCheck: true,
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '../img/[name].[ext]'
      }
    },
    {
      test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '../fonts/[name].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),

    ...PAGES.map(
      page => {
        return new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`
        })
      }
    )
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
