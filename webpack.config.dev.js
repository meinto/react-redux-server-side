var DashboardPlugin = require('webpack-dashboard/plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
var webpackClient = require('./webpack.config.client')

module.exports = merge.smart(webpackClient, {
  devtool: 'source-map',
  plugins: [
    new DashboardPlugin(),
  ],
})
