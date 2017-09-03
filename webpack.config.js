var CopyWebpackPlugin = require('copy-webpack-plugin')
var nodeExternals = require('webpack-node-externals')

module.exports = [
  {

    entry: {
      client: './src/client/App.js',
      server: './src/server/server.js',
    },

    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
    },

    externals: [nodeExternals()],

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
      new CopyWebpackPlugin([
        { from: './src/index.html' },
      ]),
    ],
  },
]
