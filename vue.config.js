// eslint-disable-next-line no-unused-vars
// const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000' // 18.188.54.151, localhost:5000, node.joerock.dev
      }
    }
  }
}
