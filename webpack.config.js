const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: ['@babel/polyfill', './src/assets/js/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProduction ? '[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[contenthash].js' : '[id].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    public: 'localhost:8080'
  },
  devtool: isProduction ? false : 'eval-source-map',
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ],
        test: /\.scss$/
      }, {
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 100
              }
            }
          }
        ],
        test: /\.(jpe?g|png|gif|svg)$/
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor'
        },
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[contenthash].css' : '[id].css'
    }),
    new CleanWebpackPlugin(['dist'])
  ]
};