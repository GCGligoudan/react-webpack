const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      chunkFilename: assetsPath('css/[name].[id].[contenthash].css')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
}

module.exports = merge(baseConfig, prodConfig);