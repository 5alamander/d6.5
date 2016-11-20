let dicepack = dice as {
    (input: string): (random?: () => number) => number
    rollDice: (times: number, face: number, modifier?: number, random?) => number 
    generateDice: (times: number, face: number, modifier?) => (random?: () => number) => number 
    setRandom: (newRandom: () => number) => void
}
dicepack.rollDice = rollDice
dicepack.generateDice = generateDice
dicepack.setRandom = setRandom
export = dice

/**
 * use a input to generate a dice,
 * format: 'dm' 'ndm' 'ndm [+-]k'
 * @param {string} input string that generate the dice
 * @return {Function}
 */
function dice (input: string): (random?: () => number) => number {
    let obj = parse(input)
    return generateDice(obj.times, obj.face, obj.modifier)
}

/**
 * roll a dice
 * @param {number} times n times to dice
 * @param {number} face n face of a dice
 * @param {number} modifier a modifier add to the result
 * @param {Function} [random = defaultRandom]
 * @return {number}
 */
function rollDice (times: number, face: number, modifier: number = 0, random = defaultRandom): number {
    if (times < 0) throw new Error('roll dice, times must >=0')
    if (face <= 0) throw new Error('roll dice, face must >0')

    let sumrnd = 0
    for (let i = 0; i < times; i ++) {
        sumrnd += random()
    }
    return Math.round(sumrnd * face + 0.5)
}

/**
 * roll a dice
 * @param {number} times n times to dice
 * @param {number} face n face of a dice
 * @param {modifier} modifier a modifier add to the result
 * @return {Function}
 */
function generateDice (times: number, face: number, modifier: number = 0): (random?: () => number) => number {
    return function (random?: () => number) {
        return rollDice(times, face, modifier, random || defaultRandom)
    }
}

var defaultRandom: () => number = Math.random

/**
 * set a random function
 * @param {Random} newRandom function.
 */
function setRandom(newRandom: () => number) {
    defaultRandom = newRandom
}

function parse (input: string) {
    let result = { times: 1, face: 6, modifier: 0 }
    let match = input.match(/^\s*([\d\.]+)?\s*[dD]\s*([\d\.]+)\s*(.*?)\s*$/)
    if (match) {
        if (match[1]) {
            result.times = parseFloat(match[1])
        }
        if (match[2]) {
            result.face = parseFloat(match[2])
        }
        if (match[3]) {
            let modifiers = match[3].match(/([+-]\s*\d+)/g)
            for (let i = 0; i < modifiers.length; i ++) {
                result.modifier += parseInt(modifiers[i].replace(/\s/g, ''))
            }
        }
    }
    else {
        throw new Error('dice parse error: ' + input)
    }
    return result
}