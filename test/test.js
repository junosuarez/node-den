// require('mocha')
require('chai').should()
var from = require('from')
var ReadableStream = require('stream').Readable
var inherits = require('util').inherits
var den = require('../index')

describe('den', function () {
  
  it('converts from a stream to a void promise which is resolved when the stream ends', function (done) {
    from([1,2,3])
      .pipe(den())
      .then(done)
      .catch(done)
  })

  it('it can be piped to', function () {
    inherits(Endless, ReadableStream)
    function Endless() {
      ReadableStream.call(this)
    }
    Endless.prototype._read = function () {}

    var readable = new Endless
    readable.pipe(den())
  })

  it('resolved on stream end', function (done) {
    var promise = den()
    var end = promise.end
    var ended = false
    promise.end = function () {
      ended = true
      return end()
    }
    promise.then(function () {
      ended.should.equal(true)
      done()
    })
    .catch(done)

    setTimeout(promise.end, 50)
  })

  it('rejected on stream error', function (done) {
    var fs = require('fs')
    fs.createReadStream('sdfsdfsdf')
      .pipe(den())
      .then(function () {
        done(new Error('should not resolve'))
      })
      .catch(function (e) {
        done()
      })
  })

})