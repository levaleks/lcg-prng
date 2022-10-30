/**
 * @desc Linear Congruential Generator (LCG)
 */
export class LCG {
    readonly seed: number;

    x: number;

    multiplier: number;

    increment: number;

    modulus: number;

    constructor({
        seed,
        multiplier,
        increment,
        modulus,
    }: {
        seed: number;
        multiplier: number;
        increment: number;
        modulus: number;
    }) {
        LCG.validateParameters({
            seed,
            multiplier,
            increment,
            modulus,
        });

        this.seed = seed;
        this.x = seed;
        this.multiplier = multiplier;
        this.increment = increment;
        this.modulus = modulus;
    }

    static validateParameters({
        seed,
        multiplier,
        increment,
        modulus,
    }: {
        seed: number;
        multiplier: number;
        increment: number;
        modulus: number;
    }): void {
        [
            LCG.validateModulus(modulus),
            LCG.validateSeed(seed, modulus),
            LCG.validateMultiplier(multiplier, modulus),
            LCG.validateIncrement(increment, modulus),
        ].forEach((result) => {
            if (typeof result === 'string') {
                throw new RangeError(result);
            }
        });
    }

    static validateSeed(seed: number, modulus: number): boolean | string {
        return (seed >= 0 && seed < modulus) || 'Seed must be >= 0 and < modulus';
    }

    static validateMultiplier(multiplier: number, modulus: number): boolean | string {
        return (multiplier >= 0 && multiplier < modulus) || 'Multiplier must be >= and < modulus';
    }

    static validateIncrement(increment: number, modulus: number): boolean | string {
        return (increment >= 0 && increment < modulus) || 'Increment must be >= 0 and < modulus';
    }

    static validateModulus(modulus: number): boolean | string {
        return modulus >= 2 || 'Modulus must be >= 2';
    }

    produce(): number {
        this.x = (this.multiplier * this.x + this.increment) % this.modulus;

        return this.x;
    }

    reset(): void {
        this.x = this.seed;
    }
}
