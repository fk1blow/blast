var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  API_URL: JSON.stringify('http://api.adhub.1stweb-dev.net/api')
  // API_URL: JSON.stringify('http://localhost:3000/api')
})
