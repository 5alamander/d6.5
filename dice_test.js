let _ = require('lodash')
let assert = require('assert')
let dice = require('./dice');

let d = dice('2d6.5')

let result = _.times(10, function() {
    return d(() => 0.99)
})
// console.log(result)
assert(_.every(result, (v) => v === 13))

console.log(dice('2d7 + 1')())
console.log(dice('2d7')())