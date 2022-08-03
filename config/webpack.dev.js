const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const scssLoader = {
  test: /\.s[ac]ss$/i,
  use: ['style-loader', 'css-loader', 'sass-loader'],
};

const ASSET_PATH = '/';

const publicPlugin = new webpack.DefinePlugin({
  'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
});

const config = merge(commonConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [scssLoader],
  },
  plugins: [publicPlugin],
});

module.exports = config;
