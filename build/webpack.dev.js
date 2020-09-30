const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, '../dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig);