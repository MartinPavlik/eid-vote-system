const path = require('path');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    server: './index.js',
    // migrations: './services/migrations.ts',
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    http: 'empty',
    // Fix __dirname to return normal path and not just "/"
    // see https://github.com/webpack/webpack/issues/1599
    __dirname: true,
  },
  watch: env !== 'production',
  /*
    Without this, webpack replaces nodejs built-in libraries with some random bullshits
    (like stream-http instead of http that does not provided ServerResponse at all...)
  */
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        // run this on source files (not on modified files)
        // aka run this loader as the first one
        enforce: 'pre',
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
