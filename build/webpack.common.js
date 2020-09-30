const path = require('path');
const Fiber = require('fibers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      include: path.join(__dirname, '../src'),
      use: [{
        loader: 'babel-loader',
      }],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: "sass-loader",
        options: {
            implementation: require("sass"),
            sassOptions: {
              fiber: Fiber,
            },
        }
      }]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{ 
        loader: 'url-loader',
        options: {
          limit: 10240,
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.join('font/[name].[hash:8].[ext]')
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({ // This is only used in production mode
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: shouldUseSourceMap
          ? {
              inline: false,
              annotation: true,
            }
          : false,
      },
      cssProcessorPluginOptions: {
        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
      },
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    // proxy: { // 配置代理
    //   '/api': {
    //     target: 'http://localhost:8000',
    //     pathRewrite: {'^/api': ''},
    //     changeOrigin: true,
    //   }
    // },
    historyApiFallback: true, // 解决启动后刷新404
    overlay: {
      errors: true,
    },
    inline: true,
    hot: true,
    compress: true // 开启gzip压缩
  },
  devtool: 'inline-source-map',
}