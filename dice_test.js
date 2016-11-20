let _ = require('lodash')
let assert = require('assert')
let dice = require('./dice');

let d = dice('2d6.5')

let result = _.times(100, function() {
    return d()
})
console.log(result)
assert(_.some(result, (v) => v === 13))