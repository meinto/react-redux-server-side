var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/server/index.js',

  output: {
    filename: 'server.js',
    path: __dirname + '/dist',
  },

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  target: 'node',

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
  ],
}
