'use strict';



// Dynamic Script and Style Tags
const HTMLPlugin = require('html-webpack-plugin');
// Makes a separate CSS bundle
const ExtractPlugin = require('extract-text-webpack-plugin');


module.exports = {
  // Load
  entry: `${__dirname}/src/main.js`,
  devtool: 'source-map',
  // Stick it into the "path" folder with that file name
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },

  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/src/index.html`,
    }),
    new ExtractPlugin('bundle.[hash].css'),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // If it's a .scss file
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap:true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths:[`${__dirname}/src/style`],
              },
            },
          ],
        }),
      },

    ],
  },

};
