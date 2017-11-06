var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
var webpackClient = require('./webpack.config.client')

module.exports = Object.assign(merge.smart(webpackClient, {
  devtool: 'source-map',
}), {
  plugins: [
    new CopyWebpackPlugin([
      { from: __dirname + '/src/client/assets/', to: __dirname + '/public/static/' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],
})
