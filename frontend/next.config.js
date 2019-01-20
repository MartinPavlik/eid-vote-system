require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins = config.plugins || [];

    /*
    config.module.rules.push(
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    );
    */

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
        },
      });
    }

    return config;
  },
};
