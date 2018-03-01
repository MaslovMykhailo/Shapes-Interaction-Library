var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var configType = {
  node: {
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  web: {
    filename: 'webIndex.js',
    libraryTarget: 'var'
  }
};

function createConfig(type) {
  return {
    entry: './main',
    output: {
      filename: configType[type].filename,
      library: 'shapesInteraction',
      libraryTarget: configType[type].libraryTarget
    },
    plugins: [
      new UglifyJsPlugin()
    ]
  }
}


module.exports = [createConfig('node'), createConfig('web')];