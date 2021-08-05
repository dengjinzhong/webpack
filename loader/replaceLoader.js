const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  // return source.replace(/World/g, '世界')
  return source.replace(/World/g, options.name)
}
