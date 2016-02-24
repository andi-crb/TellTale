
var Promise = require('es6-promise').Promise
var fs = require('fs')

module.exports = function (filePath, file) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(filePath, file, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}