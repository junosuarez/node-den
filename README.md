# den
bridge from streams to promises


## example
```js
var den = require('den')
var from = require('from')

  from([1,2,3])
    .pipe(den())
    .then(function () {
      console.log('all done!')
    })
    
```

## api

### `den()`
returns a Promise which can be `pipe`d to from a
stream. When the source stream ends, the Promise
will be resolved. If the source stream errors, the
Promise will be rejected.


## install
```console
$ npm install den
```

## running the tests

clone the repository and cd to that directory.
```console
$ npm install
$ npm test
```

## license
ISC. copyright MMXIV jden <jason@denizac.org>