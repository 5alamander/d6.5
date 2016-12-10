let _ = require('lodash')
let assert = require('assert')
let dice = require('./dice');

let d = dice('2d6.5')

let r0 = _.times(10, function() {
    return d(() => 0.99)
})
assert(_.every(r0, (v) => v === 13), 'max is 13')

let r1 = _.times(10, function () {
    return d(() => 0.01)
})
// assert(_.every(r1, (v) => v === 2), 'min is 2')

// assert(dice('2d7 + 1-2+2 + 3- 3')(() => 0.999) === 15, 'formate is passed')
console.log(dice('2d7 + 1-2+2 + 3- 3')(() => 0.999))

console.log(dice('2d7 + 1')())
console.log(dice('2d7')())