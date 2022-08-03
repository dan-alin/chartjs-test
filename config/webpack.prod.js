const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const workboxGeneratePlugin = new GenerateSW({
  clientsClaim: true,
  exclude: [/\.DS*/, /index\.html$/],
});

const copyPlugin = new CopyPlugin({
  patterns: [
    {
      from: 'public',
      globOptions: {
        ignore: ['**/*.html'],
      },
    },
  ],
});

const cssExtractPlugin = new MiniCssExtractPlugin();

const scssLoader = {
  test: /\.s[ac]ss$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

const ASSET_PATH = '/';

const publicPlugin = new webpack.DefinePlugin({
  'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
});

const config = merge(commonConfig, {
  mode: 'production',
  plugins: [workboxGeneratePlugin, copyPlugin, publicPlugin, cssExtractPlugin],
  module: {
    rules: [scssLoader],
  },
  output: {
    publicPath: ASSET_PATH,
  },
});

module.exports = config;
