var Vinyl = require('vinyl')
var through = require('through2')

module.exports = function () {
  return through.obj(function(file, enc, cb) {
    if (file.isDirectory()) {
      cb()
      return
    }
    console.log('file:', file)
    cb();
  })
}