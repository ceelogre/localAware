const path = require('path')

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:2120'
      }
    }
  }

}
