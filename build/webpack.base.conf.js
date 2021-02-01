const glob = require('glob').sync
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
// const SpritesmithPlugin = require('webpack-spritesmith')

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/pages`
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".html"))

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: ''
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /icons\/(-?\w\/?){0,}\.svg(\?.*)?$/,
      //   use: [
      //     {
      //       loader: 'svg-sprite-loader',
      //       options: {
      //         extract: true,
      //         spriteFilename: 'assets/img/sprite.svg'
      //       }
      //     },
      //     'svgo-loader'
      //   ]
      // },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `./postcss.config.js` } }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src
    }
  },
  plugins: [
    // new SpriteLoaderPlugin(),

    // new SpritesmithPlugin({
    //   src: {
    //       cwd: path.resolve(`${PATHS.src}/${PATHS.assets}icons`),
    //       glob: '*.png'
    //   },
    //   target: {
    //       image: path.resolve(`${PATHS.src}/${PATHS.assets}/img/sprite.png`),
    //       css: path.resolve(`${PATHS.src}/${PATHS.assets}/sass/helpers/sprite.css`)
    //   },
    //   apiOptions: {
    //       cssImageRef: "../img/sprite.png"
    //   },
    //   spritesmithOptions: {
    //     padding: 10
    //   }
    // }),

    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}icons`, to: `${PATHS.assets}img/icons` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
      { from: `${PATHS.src}/static`, to: '' },
    ]),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    ...PAGES.map(
      page => {
        return new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`
        })
      }
    )
  ]
}
