export declare function dice(input: string): (random?: () => number) => number;
export declare function rollDice(times: number, face: number, modifier?: number, random?: () => number): number;
export declare function generateDice(times: number, face: number, modifier?: number): (random?: () => number) => number;
export declare function setRandom(newRandom: () => number): void;
