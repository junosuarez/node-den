var Promise = require('bluebird')
var EventEmitter = require('events').EventEmitter


function den () {

  var _resolve
  var _reject
  var promise = new Promise(function (resolve, reject) {
    _resolve = resolve
    _reject = reject
  })
  Object.keys(EventEmitter.prototype).forEach(function(key) {
    promise[key] = EventEmitter.prototype[key]
  })
  promise.end = function () {
    _resolve()
  }
  promise.on('pipe', function (source) {
    source.on('error', _reject)
  })
  return promise
}

module.exports = den