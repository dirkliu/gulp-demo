var fs = require('fs')
var Vinyl = require('vinyl')
var through = require('through2')

module.exports = function (versionFile) {
  return through.obj(function(file, enc, cb) {
    if (!versionFile) {
      throw new Error('gulp-static-resolver: Missing file option');
    }

    if (file.isDirectory()) {
      cb()
      return
    }
    var versionJson = JSON.parse(fs.readFileSync(versionFile, 'utf-8').replace(/[\n\t\r]/g, ''))
    var contents = file.contents.toString()
    Object.keys(versionJson).forEach(key => {
      var staticReg = new RegExp('(?<=\\<\\w+\\s+[^\\>]*src=[\\\'\\\"])' + key + '(?=[\\\'\\\"]\\s*.*\\>)|(?<=\\<link\\s+[^\\>]*href=[\\\'\\\"])' + key + '(?=[\\\'\\\"]\\s*.*\\>)|(?<=\\burl\\([\\\"\\\']*)' + key + '(?=[\\\"\\\']*\\))', 'gm')
      contents = contents.replace(staticReg, key + '?' + versionJson[key])
    })
    file.contents = Buffer.from(contents)
    this.push(file)
    cb();
  })
}
