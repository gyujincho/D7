var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js'
  },

  // debug: true,
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'react-hot',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
    // ,
    // {
    //   test: /\.css$/,
    //   loader: 'style!css'
    // }
  ]
  }
}
