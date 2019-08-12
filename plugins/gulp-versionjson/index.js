var through = require('through2')
var gutil = require('gulp-util')
var PluginError = gutil.PluginError

function versionjson(options) {
  var stream = through.obj(function(file, enc, cb) {
    console.log('versionjson')
    // 确保文件进去下一个插件
    this.push(file);
    // 告诉 stream 转换工作完成
    cb();
  })

  return stream;
}

module.exports = versionjson
