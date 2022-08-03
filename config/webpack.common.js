const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { DIST_PATH } = require('./helpers/paths');

const htmlPlugin = new HtmlWebpackPlugin({
  template: 'public/index.html',
});

const cleanPlugin = new CleanWebpackPlugin();

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const swcLoader = {
  test: /\.([jt]sx?)?$/,
  use: 'swc-loader',
  exclude: /node_modules/,
};

const assetsRules = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
};

const fontRules = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
};

const config = {
  entry: './src/index.tsx',
  output: {
    path: DIST_PATH,
    filename: '[name].bundle.[contenthash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [swcLoader, assetsRules, fontRules],
  },
  plugins: [htmlPlugin, cleanPlugin],
};

module.exports = config;
