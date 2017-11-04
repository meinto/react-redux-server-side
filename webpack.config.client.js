var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {

  entry: './src/client/index.js',

  output: {
    filename: 'client.js',
    path: __dirname + '/dist/static',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  node: {
    fs: 'empty', // fix for -> Can't resolve 'fs' in ... node_modules
    net: 'empty', // fix for -> Can't resolve 'net' in ... node_modules
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks 
    new CopyWebpackPlugin([
      { from: __dirname + '/src/client/assets/', to: __dirname + '/public/static/' },
    ]),
  ],
}
