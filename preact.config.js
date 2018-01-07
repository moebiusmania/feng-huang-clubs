'use strict';

const WebpackNotifierPlugin = require('webpack-notifier');
const Dotenv = require('dotenv-webpack');

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {

  const uglify = helpers.getPluginsByName(config, 'UglifyJsPlugin')
    .map(e => e.index)[0];
  
  const notifier = new WebpackNotifierPlugin({
    title: 'Feng Huang',
    alwaysNotify: true
  });

  const dotenv =  new Dotenv({
    path: './.env', // Path to .env file (this is the default) 
    // safe: true // load .env.example (defaults to "false" which does not use dotenv-safe) 
  });

  config.plugins.splice(uglify, 1);
  config.plugins.push(notifier);
  config.plugins.push(dotenv);


}