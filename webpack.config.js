const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // Load environment variables from .env file
  const env = dotenv.config().parsed;

  // Create an object to pass the environment variables to the code
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './src/popup.js', // Entry point of your extension
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'popup.bundle.js' // Bundle output
    },
    plugins: [
      new webpack.DefinePlugin(envKeys) // Pass environment variables to the code
    ],
    mode: 'development' // Set to 'production' for a production build
  };
};
