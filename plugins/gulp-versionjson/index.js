var fs = require('fs')
var crypto = require('crypto')
var Vinyl = require('vinyl');
var through = require('through2')

function versionjson(file) {
  if (!file) {
    throw new Error('gulp-concat: Missing file option');
  }
  var fileName = file || 'version.json'
  var jsonMap = {}

  function md5(file, algorithm, encoding, fileEncoding) {
    var hash = crypto.createHash(algorithm);
    // grunt.log.verbose.write('Hashing ' + filepath + '...');
    // hash.update(grunt.file.read(filepath), fileEncoding);
    hash.update(file, fileEncoding)
    return hash.digest(encoding)
  }

  function bufferContents (file, enc, cb) {
    if (file.isDirectory()) {
      cb()
      return
    }
    var hash = md5(file.contents, 'md5', 'hex', 'utf8')
    jsonMap[file.relative.replace('\\', '/')] = hash
    cb()
  }

  function endStream (cb) {
    var versionFile = new Vinyl({
      path: file,
      contents: Buffer.from(JSON.stringify(jsonMap, '', '\t'))
    })
    this.push(versionFile)
    cb()
  }

  return through.obj(bufferContents, endStream)
}

module.exports = versionjson
