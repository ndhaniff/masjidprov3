const path = require('path');
module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      "fs": false
    },
    alias: {
      '@': path.resolve('resources/js')
    },
  },
  output: {
    chunkFilename: 'js/[name].js?id=[chunkhash]',
  },
  devServer: {
    allowedHosts: 'all',
  },
};