# d6.5
this is a package to generate D&amp;D dice

## Interface
``` ts
declare module 'd6.5' {

    interface IDice {
        (input: string): (random?: () => number) => number
        rollDice: (times: number, face: number, modifier?: number, random?) => number
        generateDice: (times: number, face: number, modifier?) => (random?: () => number) => number
        setRandom: (newRandom: () => number) => void
    }

    var dice: IDice
    export = dice
}
```
