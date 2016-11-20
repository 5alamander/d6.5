"use strict";
let dicepack = dice;
dicepack.rollDice = rollDice;
dicepack.generateDice = generateDice;
dicepack.setRandom = setRandom;
function dice(input) {
    let obj = parse(input);
    return generateDice(obj.times, obj.face, obj.modifier);
}
function rollDice(times, face, modifier = 0, random = defaultRandom) {
    if (times < 0)
        throw new Error('roll dice, times must >=0');
    if (face <= 0)
        throw new Error('roll dice, face must >0');
    let sumrnd = 0;
    for (let i = 0; i < times; i++) {
        sumrnd += random();
    }
    return Math.round(sumrnd * face + 0.5);
}
function generateDice(times, face, modifier = 0) {
    return function (random) {
        return rollDice(times, face, modifier, random || defaultRandom);
    };
}
var defaultRandom = Math.random;
function setRandom(newRandom) {
    defaultRandom = newRandom;
}
function parse(input) {
    let result = { times: 1, face: 6, modifier: 0 };
    let match = input.match(/^\s*(\d+)?\s*[dD]\s*(\d+)\s*(.*?)\s*$/);
    if (match) {
        if (match[1]) {
            result.times = parseInt(match[1]);
        }
        if (match[2]) {
            result.face = parseInt(match[2]);
        }
        if (match[3]) {
            let modifiers = match[3].match(/([+-]\s*\d+)/g);
            for (let i = 0; i < modifiers.length; i++) {
                result.modifier += parseInt(modifiers[i].replace(/\s/g, ''));
            }
        }
    }
    else {
        throw new Error('dice parse error: ' + input);
    }
    return result;
}
module.exports = dice;
